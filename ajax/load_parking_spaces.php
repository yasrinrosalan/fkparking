<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');

include "../db.php";

// Prepare and execute a query to retrieve parking spaces
$stmt = $conn->prepare("SELECT * FROM parking_spaces");
$stmt->execute();
$result = $stmt->get_result();

// Fetch and store the parking spaces data
$parkingSpaces = array();
while ($row = $result->fetch_assoc()) {
    $parkingSpaces[] = array(
        'spaceId' => $row['space_id'],
        'studentId' => $row['student_id'],
        'date' => $row['date'],
        'time' => $row['time'],
        'qrCode' => $row['qr_code']
    );
}

// Return the parking spaces data in JSON format
if (!empty($parkingSpaces)) {
    echo json_encode(array('success' => true, 'parking_spaces' => $parkingSpaces));
} else {
    echo json_encode(array('success' => false, 'error' => 'No parking spaces found'));
}
?>