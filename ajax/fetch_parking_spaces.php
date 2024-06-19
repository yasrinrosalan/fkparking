<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');

include "../db.php";

$query = "SELECT * FROM parking_spaces";
$result = $conn->query($query);

$parking_spaces = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $parking_spaces[] = $row;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No parking spaces found']);
}

$conn->close();

echo json_encode(['success' => true, 'parking_spaces' => $parking_spaces]);