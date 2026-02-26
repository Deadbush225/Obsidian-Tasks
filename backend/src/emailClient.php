<?php

class BrevoMailer {
    private $apiKey;
    private $senderEmail;
    private $senderName;

    public function __construct($apiKey, $senderEmail, $senderName = "Gantt Viewer") {	
        $this->apiKey = $apiKey;
        $this->senderEmail = $senderEmail;
        $this->senderName = $senderName;
    }

    public function sendOTP($toEmail, $otpCode) {
        $url = "https://api.brevo.com/v3/smtp/email";

        // The Data Payload
        $data = [
            "sender" => [
                "name" => $this->senderName,
                "email" => $this->senderEmail
            ],
            "to" => [
                [
                    "email" => $toEmail
                ]
            ],
            "subject" => "Your Gantt Viewer Verification Code",
            "htmlContent" => "
                <div style='font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9;'>
                    <h2 style='color: #1f8ef1;'>Gantt Viewer Verification</h2>
                    <p>Enter this code to verify your account:</p>
                    <div style='background: white; padding: 15px; display: inline-block; border-radius: 8px; border: 1px solid #ddd;'>
                        <h1 style='margin: 0; letter-spacing: 5px; color: #333;'>$otpCode</h1>
                    </div>
                    <p style='font-size: 12px; color: #888; margin-top: 20px;'>Valid for 10 minutes.</p>
                </div>
            "
        ];

        // Initialize CURL
        $ch = curl_init($url);
        
        // Setup Headers
        $headers = [
            "accept: application/json",
            "api-key: " . $this->apiKey,
            "content-type: application/json"
        ];

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Check Success (201 = Created)
        if ($httpCode === 201) {
            return true;
        } else {
            // Log the error response to see what went wrong
            error_log("Brevo Error: " . $response);
            return false;
        }
    }
}
?>