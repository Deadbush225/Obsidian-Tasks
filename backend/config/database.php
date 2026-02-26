<?php

class Database {
    private $pdo;

    public function connect() {
        if ($this->pdo == null) {
            try {
                $host     = $_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: 'localhost';
                $db_name  = $_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'gantt_viewer';
                $username = $_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'gantt_user';
                $password = $_ENV['DB_PASS'] ?? getenv('DB_PASS') ?: '';

                $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8mb4";

                $this->pdo = new PDO($dsn, $username, $password);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

                $this->initTables();
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['msg' => 'Database connection error: ' . $e->getMessage()]);
                exit;
            }
        }
        return $this->pdo;
    }

    private function initTables() {
        $queries = [
            // ── Users ─────────────────────────────────────────────────────────
            "CREATE TABLE IF NOT EXISTS users (
                user_id        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
                email          VARCHAR(255)  NOT NULL UNIQUE,
                password_hash  VARCHAR(255)  NOT NULL,
                first_name     VARCHAR(100)  NOT NULL,
                last_name      VARCHAR(100)  NOT NULL,
                email_verified TINYINT(1)    NOT NULL DEFAULT 0,
                creation_date  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB",

            // ── OTPs (email verification + password reset) ────────────────────
            "CREATE TABLE IF NOT EXISTS otps (
                otp_id        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
                user_id       INT UNSIGNED  NOT NULL,
                email         VARCHAR(255)  NOT NULL,
                code          VARCHAR(10)   NOT NULL,
                purpose       ENUM('register','reset_password') NOT NULL DEFAULT 'register',
                expire_date   DATETIME      NOT NULL,
                is_used       TINYINT(1)    NOT NULL DEFAULT 0,
                creation_date DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            ) ENGINE=InnoDB",

            // ── Gantt Tasks (server-side sync store) ──────────────────────────
            "CREATE TABLE IF NOT EXISTS gantt_tasks (
                id              VARCHAR(128)    NOT NULL,
                user_id         INT UNSIGNED    NOT NULL,
                title           VARCHAR(500)    NOT NULL DEFAULT '',
                status          VARCHAR(50)     NOT NULL DEFAULT 'todo',
                priority        VARCHAR(50)     NOT NULL DEFAULT 'medium',
                start_date      DATE            DEFAULT NULL,
                end_date        DATE            DEFAULT NULL,
                raw_frontmatter TEXT            DEFAULT NULL,
                is_archived     TINYINT(1)      NOT NULL DEFAULT 0,
                updated_at      BIGINT UNSIGNED NOT NULL,
                server_time     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id, user_id),
                INDEX idx_user_updated (user_id, updated_at)
            ) ENGINE=InnoDB",

            // ── Sync Log (audit trail) ────────────────────────────────────────
            "CREATE TABLE IF NOT EXISTS gantt_sync_log (
                log_id      INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
                user_id     INT UNSIGNED    NOT NULL,
                task_id     VARCHAR(128)    NOT NULL,
                action      ENUM('push','pull','conflict_server_win','conflict_client_win') NOT NULL,
                client_ts   BIGINT UNSIGNED DEFAULT NULL,
                server_ts   BIGINT UNSIGNED DEFAULT NULL,
                created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_log_user (user_id)
            ) ENGINE=InnoDB",
        ];

        foreach ($queries as $query) {
            $this->pdo->exec($query);
        }
    }
}

