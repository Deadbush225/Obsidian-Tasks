<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/emailClient.php';

class Auth {
    private $pdo;
    private $key;
    private $config;
    private $mailer;

    public function __construct($pdo) {
        $this->pdo    = $pdo;
        $this->config = require __DIR__ . '/../config/config.php';
        $this->key    = $_ENV['JWT_SECRET'] ?? getenv('JWT_SECRET') ?: 'change_this_secret';
        $this->mailer = new BrevoMailer(
            $_ENV['BREVO_API_KEY'],
            $_ENV['BREVO_SENDER_EMAIL']
        );
    }

    private function validateEmail($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format", 400);
        }
    }

    private function generateOTP() {
        return str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    private function issueToken($userId) {
        $payload = [
            'user' => ['id' => $userId],
            'iat'  => time(),
            'exp'  => time() + (3600 * 24 * 7),
        ];
        return JWT::encode($payload, $this->key, 'HS256');
    }

    private function insertOtp($userId, $email, $otp, $purpose = 'register') {
        $stmt = $this->pdo->prepare(
            "UPDATE otps SET is_used = 1 WHERE user_id = ? AND purpose = ? AND is_used = 0"
        );
        $stmt->execute([$userId, $purpose]);
        $expiry = date('Y-m-d H:i:s', time() + ($this->config['otp_expiry_minutes'] * 60));
        $stmt = $this->pdo->prepare(
            "INSERT INTO otps (user_id, email, code, purpose, expire_date) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([$userId, $email, $otp, $purpose, $expiry]);
    }

    public function register($data) {
        $email      = trim($data['email']      ?? '');
        $password   = trim($data['password']   ?? '');
        $first_name = trim($data['first_name'] ?? '');
        $last_name  = trim($data['last_name']  ?? '');

        if (!$email || !$password || !$first_name || !$last_name) {
            throw new Exception("Email, password, first name, and last name are required", 400);
        }
        $this->validateEmail($email);

        $stmt = $this->pdo->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) throw new Exception("Email already registered", 409);

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (email, password_hash, first_name, last_name)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$email, $hash, $first_name, $last_name]);
        $userId = (int)$this->pdo->lastInsertId();

        $otp = $this->generateOTP();
        $this->insertOtp($userId, $email, $otp, 'register');

        try { $this->mailer->sendOTP($email, $otp); }
        catch (Exception $e) { error_log("OTP email failed: " . $e->getMessage()); }

        return [
            'msg'   => 'Registration successful. Please check your email for a verification code.',
            'email' => $email,
        ];
    }

    public function verifyOTP($data) {
        $email   = trim($data['email']   ?? '');
        $code    = trim($data['otp']     ?? '');
        $purpose = $data['purpose'] ?? 'register';

        if (!$email || !$code) throw new Exception("Email and OTP are required", 400);

        $stmt = $this->pdo->prepare(
            "SELECT o.otp_id, o.user_id, o.expire_date, o.is_used
             FROM otps o
             WHERE o.email = ? AND o.code = ? AND o.purpose = ?
             ORDER BY o.creation_date DESC LIMIT 1"
        );
        $stmt->execute([$email, $code, $purpose]);
        $otp = $stmt->fetch();

        if (!$otp)           throw new Exception("Invalid OTP code", 400);
        if ($otp['is_used']) throw new Exception("OTP already used", 400);
        if (strtotime($otp['expire_date']) < time()) throw new Exception("OTP expired", 400);

        $this->pdo->prepare("UPDATE otps SET is_used = 1 WHERE otp_id = ?")->execute([$otp['otp_id']]);

        if ($purpose === 'register') {
            $this->pdo->prepare("UPDATE users SET email_verified = 1 WHERE user_id = ?")->execute([$otp['user_id']]);
        }

        $token    = $this->issueToken($otp['user_id']);
        $userData = $this->getUser($otp['user_id']);
        return ['token' => $token, 'userId' => (string)$otp['user_id'], 'user' => $userData];
    }

    public function resendOTP($data) {
        $email   = trim($data['email']   ?? '');
        $purpose = $data['purpose'] ?? 'register';
        if (!$email) throw new Exception("Email required", 400);

        $stmt = $this->pdo->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user) throw new Exception("User not found", 404);

        $stmt = $this->pdo->prepare(
            "SELECT expire_date FROM otps WHERE user_id = ? AND purpose = ? AND is_used = 0
             ORDER BY creation_date DESC LIMIT 1"
        );
        $stmt->execute([$user['user_id'], $purpose]);
        $last = $stmt->fetch();
        if ($last && strtotime($last['expire_date']) > time()) {
            throw new Exception("OTP already sent. Please wait before requesting again.", 429);
        }

        $otp = $this->generateOTP();
        $this->insertOtp($user['user_id'], $email, $otp, $purpose);

        try { $this->mailer->sendOTP($email, $otp); }
        catch (Exception $e) {
            error_log("OTP email failed: " . $e->getMessage());
            throw new Exception("Failed to send email", 500);
        }

        return ['msg' => 'OTP sent to ' . $email];
    }

    public function login($data) {
        $email    = trim($data['email']    ?? '');
        $password = trim($data['password'] ?? '');

        if (!$email || !$password) throw new Exception("Email and password are required", 400);

        $stmt = $this->pdo->prepare(
            "SELECT user_id, password_hash, email_verified FROM users WHERE email = ?"
        );
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new Exception("Invalid email or password", 401);
        }
        if (!$user['email_verified']) {
            throw new Exception("Email not verified. Please check your inbox for the OTP.", 403);
        }

        $token    = $this->issueToken($user['user_id']);
        $userData = $this->getUser($user['user_id']);
        return ['token' => $token, 'userId' => (string)$user['user_id'], 'user' => $userData];
    }

    public function requestPasswordReset($data) {
        $email = trim($data['email'] ?? '');
        if (!$email) throw new Exception("Email required", 400);

        $stmt = $this->pdo->prepare("SELECT user_id, email_verified FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !$user['email_verified']) {
            return ['msg' => 'If that email is registered, a reset code has been sent.'];
        }

        $otp = $this->generateOTP();
        $this->insertOtp($user['user_id'], $email, $otp, 'reset_password');
        try { $this->mailer->sendOTP($email, $otp); }
        catch (Exception $e) { error_log("Reset email failed: " . $e->getMessage()); }

        return ['msg' => 'If that email is registered, a reset code has been sent.'];
    }

    public function resetPassword($data) {
        $email    = trim($data['email']       ?? '');
        $code     = trim($data['otp']         ?? '');
        $password = trim($data['newPassword'] ?? '');

        if (!$email || !$code || !$password) throw new Exception("All fields required", 400);

        $stmt = $this->pdo->prepare(
            "SELECT otp_id, user_id, expire_date, is_used FROM otps
             WHERE email = ? AND code = ? AND purpose = 'reset_password'
             ORDER BY creation_date DESC LIMIT 1"
        );
        $stmt->execute([$email, $code]);
        $otp = $stmt->fetch();

        if (!$otp || $otp['is_used'])                    throw new Exception("Invalid OTP", 400);
        if (strtotime($otp['expire_date']) < time()) throw new Exception("OTP expired", 400);

        $this->pdo->prepare("UPDATE otps SET is_used = 1 WHERE otp_id = ?")->execute([$otp['otp_id']]);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $this->pdo->prepare("UPDATE users SET password_hash = ? WHERE user_id = ?")->execute([$hash, $otp['user_id']]);

        return ['msg' => 'Password reset successful.'];
    }

    public function authenticate() {
        $token   = null;
        $headers = function_exists('apache_request_headers')
            ? apache_request_headers()
            : $this->getEmulatedHeaders();

        foreach (['Authorization', 'authorization'] as $key) {
            if (isset($headers[$key])) {
                $token = str_replace('Bearer ', '', $headers[$key]);
                break;
            }
        }
        if (!$token && isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
        }
        if (!$token) throw new Exception("No token — authorization denied", 401);

        try {
            $decoded = JWT::decode($token, new Key($this->key, 'HS256'));
            return $decoded->user->id;
        } catch (Exception $e) {
            throw new Exception("Token invalid or expired", 401);
        }
    }

    public function getUser($userId) {
        $stmt = $this->pdo->prepare(
            "SELECT user_id, email, first_name, last_name, email_verified, creation_date
             FROM users WHERE user_id = ?"
        );
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        if (!$user) throw new Exception("User not found", 404);
        return $user;
    }

    public function updateProfile($userId, $data) {
        $first_name = trim($data['first_name'] ?? '');
        $last_name  = trim($data['last_name']  ?? '');

        if (!$first_name || !$last_name) throw new Exception("First and last name are required", 400);

        $stmt = $this->pdo->prepare(
            "UPDATE users SET first_name=?, last_name=? WHERE user_id=?"
        );
        $stmt->execute([$first_name, $last_name, $userId]);
        return $this->getUser($userId);
    }

    private function getEmulatedHeaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (str_starts_with($name, 'HTTP_')) {
                $key = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
                $headers[$key] = $value;
            }
        }
        return $headers;
    }
}
