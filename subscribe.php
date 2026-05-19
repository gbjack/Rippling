<?php
// 1. Include the Campaign Monitor PHP library (download from GitHub)
require_once 'csrest_subscribers.php';

// 2. Your credentials
$api_key = '89a47006348ca6a768debed965125f4f';
$list_id = '491eba9b940f410cb9c81a2006fa8a9c';

// 3. Get data from the AJAX request
$email = $_POST['cm-tdltyhy-tdltyhy']; // Use your email field name
$first_name = $_POST['cm-f-tdojri'];
$last_name = $_POST['cm-f-tdojrd'];

// 4. Prepare data for the API
$subscriber_data = [
    'EmailAddress' => $email,
    'Name' => $first_name . ' ' . $last_name,
    'Resubscribe' => true,
    'CustomFields' => [
        ['Key' => 'FirstName', 'Value' => $first_name],
        ['Key' => 'LastName', 'Value' => $last_name],
        // Add other fields like 'Phone', 'DietaryRequirements' here
    ]
];

// 5. Make the API call
$auth = ['api_key' => $api_key];
$wrap = new CS_REST_Subscribers($list_id, $auth);
$result = $wrap->add($subscriber_data);

// 6. Return a JSON response for your frontend JavaScript
header('Content-Type: application/json');
if ($result->was_successful()) {
    echo json_encode(['success' => true, 'message' => 'Successfully subscribed!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Subscription failed. Please try again.']);
}
?>