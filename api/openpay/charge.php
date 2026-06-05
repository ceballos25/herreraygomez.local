<?php

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$config = require __DIR__ . '/config.php';
$merchantId = $config['merchant_id'];
$privateKey = $config['private_key'];
$baseUrl = ($config['environment'] ?? 'sandbox') === 'production'
    ? 'https://api.openpay.co/v1/'
    : 'https://sandbox-api.openpay.co/v1/';

function openpay_request(string $url, string $privateKey, ?array $body = null): array {
    $headers = ['Content-Type: application/json'];
    if ($body !== null) {
        $headers[] = 'Authorization: Basic ' . base64_encode($privateKey . ':');
    } else {
        $headers[] = 'Authorization: Basic ' . base64_encode($privateKey . ':');
    }
    $ch = curl_init($url);
    $opts = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 30,
    ];
    if ($body !== null) {
        $opts[CURLOPT_POST] = true;
        $opts[CURLOPT_POSTFIELDS] = json_encode($body, JSON_UNESCAPED_UNICODE);
    }
    curl_setopt_array($ch, $opts);
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['code' => $code, 'data' => json_decode((string) $response, true)];
}

function find_charge_by_order(string $baseUrl, string $merchantId, string $privateKey, string $orderId): ?array {
    $r = openpay_request($baseUrl . $merchantId . '/charges?order_id=' . rawurlencode($orderId), $privateKey);
    $list = $r['data'] ?? [];
    if (isset($list[0]) && is_array($list[0])) {
        return $list[0];
    }
    return null;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($_GET['action'] ?? '') === 'verify') {
    $id = $_GET['charge_id'] ?? $_GET['id'] ?? '';
    $orderId = $_GET['order_id'] ?? '';

    if ($id) {
        $r = openpay_request($baseUrl . $merchantId . '/charges/' . $id, $privateKey);
        $c = $r['data'] ?? [];
    } elseif ($orderId) {
        $c = find_charge_by_order($baseUrl, $merchantId, $privateKey, $orderId) ?? [];
        $id = $c['id'] ?? '';
    } else {
        http_response_code(400);
        echo json_encode(['description' => 'charge_id u order_id requerido']);
        exit;
    }

    $status = $c['status'] ?? 'unknown';
    echo json_encode([
        'verified' => $status === 'completed',
        'status'   => $status,
        'chargeId' => $id ?: null,
        'orderId'  => $c['order_id'] ?? $orderId ?: null,
        'amount'   => $c['amount'] ?? null,
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $in = json_decode(file_get_contents('php://input'), true);
    if (!is_array($in)) {
        http_response_code(400);
        echo json_encode(['description' => 'JSON inválido', 'error_code' => 1001]);
        exit;
    }

    $c = $in['customer'] ?? [];
    $phone = preg_replace('/\D/', '', trim((string) ($c['phone'] ?? $c['phone_number'] ?? '')));
    if (strlen($phone) === 12 && strpos($phone, '57') === 0) {
        $phone = substr($phone, 2);
    }

    $orderId = substr($in['order_id'] ?? uniqid('HYG-'), 0, 100);
    $redirectBase = trim((string) ($in['redirect_url'] ?? $config['success_url'] ?? ''));
    if ($redirectBase === '') {
        http_response_code(400);
        echo json_encode(['description' => 'redirect_url es requerido — configura success_url en config.php']);
        exit;
    }
    $redirectUrl = $redirectBase;
    if (strpos($redirectUrl, 'order_id=') === false) {
        $redirectUrl .= (strpos($redirectUrl, '?') !== false ? '&' : '?') . 'order_id=' . rawurlencode($orderId);
    }

    $payload = [
        'method'       => 'bank_account',
        'amount'       => (float) ($in['amount'] ?? 0),
        'currency'     => 'COP',
        'iva'          => (string) (int) round($in['iva'] ?? 0),
        'description'  => substr($in['description'] ?? 'Compra Herrera y Gomez', 0, 250),
        'order_id'     => $orderId,
        'redirect_url' => $redirectUrl,
        'customer'     => [
            'name'             => trim((string) ($c['firstName'] ?? $c['name'] ?? 'Cliente')),
            'last_name'        => trim((string) ($c['lastName'] ?? 'HYG')),
            'email'            => trim((string) ($c['email'] ?? '')),
            'phone_number'     => $phone,
            'requires_account' => false,
            'customer_address' => [
                'department' => trim((string) ($c['state'] ?? '')),
                'city'       => trim((string) ($c['city'] ?? '')),
                'additional' => trim((string) ($c['address'] ?? '')),
            ],
        ],
    ];

    $r = openpay_request($baseUrl . $merchantId . '/charges', $privateKey, $payload);
    http_response_code($r['code'] ?: 502);
    $d = $r['data'] ?? [];

    if ($r['code'] === 200 || $r['code'] === 201) {
        echo json_encode([
            'id'           => $d['id'] ?? null,
            'order_id'     => $d['order_id'] ?? $orderId,
            'status'       => $d['status'] ?? null,
            'redirect_url' => $d['payment_method']['url'] ?? $d['redirect_url'] ?? null,
        ]);
    } else {
        echo json_encode($d ?: ['description' => 'Error en OpenPay']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['description' => 'Método no permitido']);
