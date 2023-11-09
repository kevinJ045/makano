<?php
// Get the request data in JSON format
$request_data = file_get_contents('php://input');

// Check if the request data is valid JSON
if ($request_data === false) {
    http_response_code(400); // Bad Request
    echo 'Invalid JSON data';
    exit;
}

// Decode the JSON data
$data = json_decode($request_data, true);

// Check if the JSON data is valid and contains 'filename' and 'content' fields
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['filename']) || !isset($data['content'])) {
    http_response_code(400); // Bad Request
    echo 'Invalid JSON data format';
    exit;
}

// Extract the filename and content from the JSON data
$filename = $data['filename'];
$content = $data['content'];

// Check if the file already exists
if (file_exists($filename)) {
    // Modify the existing file
    file_put_contents($filename, $content);
    echo 'File modified successfully';
} else {
    // Create a new file
    file_put_contents($filename, $content);
    echo 'File created successfully';
}
?>

i have this php, but i want it when there is no input and the method is GET, i want it to list all files in the dir "up", if there is an input and its a json, it does this:

first, it checks if an API_KEY param is passed, if it is, it will check that API_KEY in the $KEYS array, if it is found, then it will check the permission of the key,

next up, it will check for the action in the json file, this is the json structure:

{
	"action": "read|write|delete",
	"payload": {
		"filename": "FileName",
		"change": "create|write|none|delete",
		"type": "folder|file",
		"content": "filecontent"
	}
}

next up, if the API_KEY has no access to the action, it will return 401.

if it has access, it will proceed by making executing the payload, if the payload change is none, 
it's a read request, if it is create/write, it will do file_put_contents unless it's a folder, then it will
create the folder.

when it creates files or folder, if the filename's parent folders don't exist, it must create it

if it's a file and it's a write or create, it will put the contents of the payload.content.
