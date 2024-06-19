<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');

include "../db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $oldSpaceId = $_POST['spaceId'];
    $newSpaceId = $_POST['updatedSpaceId'];
    $studentId = $_POST['updatedStudentId'];
    $date = $_POST['updatedDate'];
    $time = $_POST['updatedTime'];
    $parkingSpaceId = $_POST['spaceId']; // assuming this is the primary key or unique identifier

    // Update the parking space in the database
    $query = "UPDATE parking_spaces SET space_id =?, student_id =?, date =?, time =? WHERE space_id =?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('isssi', $newSpaceId, $studentId, $date, $time, $oldSpaceId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>