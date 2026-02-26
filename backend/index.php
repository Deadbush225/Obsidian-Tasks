<?php
// CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// When used as PHP built-in server router, serve static files natively
if (php_sapi_name() === 'cli-server') {
    $file = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (is_file($file)) {
        return false;
    }
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB
$database = new Database();
$pdo      = $database->connect();

// Classes
require_once __DIR__ . '/src/Auth.php';
require_once __DIR__ . '/src/Tasks.php';

$auth  = new Auth($pdo);
$tasks = new Tasks($pdo);

function getJsonInput() {
    return json_decode(file_get_contents("php://input"), true) ?? [];
}

// Router
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// 1. Hardcode your exact folder path on HelioHost
$basePath = '/obgantt/backend';

// 2. Strip it
if (strpos($uri, $basePath) === 0) {
    $path = substr($uri, strlen($basePath));
} else {
    $path = $uri;
}

// 3. Ensure we always have at least a slash
if ($path === '' || $path === false) {
    $path = '/';
}

// --- TEMPORARY DEBUGGING BLOCK ---
// Uncomment the line below, upload to HelioHost, and hit the URL again.
// It will instantly print the variables so we can see exactly what Apache is passing to PHP.

// echo json_encode(["Original_URI" => $uri, "Stripped_Path" => $path]); exit;
// ---------------------------------

// Extract dynamic segments
$segments = explode('/', trim($path, '/'));

try {
    // ── AUTH ──────────────────────────────────────────────────────────────────
    if ($path === '/auth/register' && $method === 'POST') {
        echo json_encode($auth->register(getJsonInput()));

    } elseif ($path === '/auth/login' && $method === 'POST') {
        echo json_encode($auth->login(getJsonInput()));

    } elseif ($path === '/auth/verify-otp' && $method === 'POST') {
        echo json_encode($auth->verifyOTP(getJsonInput()));

    } elseif ($path === '/auth/resend-otp' && $method === 'POST') {
        echo json_encode($auth->resendOTP(getJsonInput()));

    } elseif ($path === '/auth/forgot-password' && $method === 'POST') {
        echo json_encode($auth->requestPasswordReset(getJsonInput()));

    } elseif ($path === '/auth/reset-password' && $method === 'POST') {
        echo json_encode($auth->resetPassword(getJsonInput()));

    } elseif ($path === '/auth/profile' && $method === 'GET') {
        $userId = $auth->authenticate();
        echo json_encode($auth->getUser($userId));

    } elseif ($path === '/auth/profile' && $method === 'PUT') {
        $userId = $auth->authenticate();
        echo json_encode($auth->updateProfile($userId, getJsonInput()));

    // ── GANTT TASKS (sync) ────────────────────────────────────────────────────
    //
    //  GET  /tasks          — list all non-archived tasks for the authed user
    //  GET  /tasks/pull     — delta pull: ?since=<unix_millis>
    //  POST /tasks/push     — batch upsert with conflict detection
    //  PUT  /tasks/:id      — single-task upsert (same conflict logic)
    //  DELETE /tasks/:id    — soft-archive a task

    } elseif ($path === '/tasks' && $method === 'GET') {
        $userId = $auth->authenticate();
        echo json_encode($tasks->list($userId));

    } elseif ($path === '/tasks/pull' && $method === 'GET') {
        $userId = $auth->authenticate();
        $since  = isset($_GET['since']) ? (int)$_GET['since'] : 0;
        echo json_encode($tasks->pull($userId, $since));

    } elseif ($path === '/tasks/push' && $method === 'POST') {
        $userId  = $auth->authenticate();
        $payload = getJsonInput();
        $batch   = $payload['tasks'] ?? [];
        if (!is_array($batch)) throw new Exception("'tasks' must be an array", 400);
        echo json_encode($tasks->push($userId, $batch));

    } elseif (isset($segments[0], $segments[1])
        && $segments[0] === 'tasks' && $segments[1] !== ''
        && !isset($segments[2])) {
        $taskId = $segments[1];

        if ($method === 'PUT') {
            $userId  = $auth->authenticate();
            $payload = getJsonInput();
            $payload['id'] = $taskId;
            echo json_encode($tasks->push($userId, [$payload]));

        } elseif ($method === 'DELETE') {
            $userId = $auth->authenticate();
            echo json_encode($tasks->archive($userId, $taskId));

        } else {
            http_response_code(405);
            echo json_encode(['msg' => 'Method not allowed']);
        }

    // ── FALLBACK ──────────────────────────────────────────────────────────────
    } else {
        http_response_code(404);
        echo json_encode(['msg' => "Route not found: $method $path"]);
    }

} catch (Exception $e) {
    $code = (int)$e->getCode();
    http_response_code($code >= 100 && $code < 600 ? $code : 500);
    echo json_encode(['msg' => $e->getMessage()]);
}
