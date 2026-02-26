<?php

// Configuration file
return [
    'brevo_api_key' => getenv('BREVO_API_KEY') ?: 'your_brevo_api_key_here', // Set via environment variable
    'brevo_sender_email' => getenv('BREVO_SENDER_EMAIL') ?: 'your_email@example.com', // Set via environment variable
    'allowed_email_domains' => ['gmail.com', 'yahoo.com'],
    'otp_expiry_minutes' => 10,
    'daily_post_limit' => 10,
];
