<?php
require_once 'csrest_subscribers.php';

$api_key = 'YOUR_API_KEY';
$list_id = 'YOUR_LIST_ID';

$auth = array('api_key' => $api_key);
$wrap = new CS_REST_Subscribers($list_id, $auth);

$test_email = 'test-' . time() . '@example.com'; // Unique email each time

$result = $wrap->add(array(
    'EmailAddress' => $test_email,
    'Resubscribe' => true
));

if ($result->was_successful()) {
    echo "SUCCESS: Test subscriber added: " . $test_email;
} else {
    echo "FAILED: " . $result->response->Message;
}
?>