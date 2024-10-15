<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    //'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    //'allowed_origins' => ['http://localhost:5173'],
    // 'allowed_origins' => [
    //     'https://1a9c-92-34-244-149.ngrok-free.app', // Your frontend URL
    //     //'https://c650-92-34-244-149.ngrok-free.app' // This could also be necessary
    // ],

    //'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],
    // 'allowed_headers' => ['
    //     Content-Type',
    //     'Authorization',
    //     'X-Requested-With',
    //     'Accept',
    //     'Origin',
    //     'X-CSRF-Token',
    // ],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
