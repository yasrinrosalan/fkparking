<?php
require('db.php');
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $spaceId = $_POST['spaceId'];
    $studentId = $_POST['studentId'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $qr_code = 'QR_CODE_' . $space_id . '_' . $student_id . '_' . $date . '_' . $time;

    $stmt = $conn->prepare("INSERT INTO parking_spaces (spaceId, studentId, available_date, available_time) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $spaceId, $studentId, $date, $time);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create parking space."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>