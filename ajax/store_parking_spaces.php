<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');

include "../db.php";

$qrcode = $_POST['qrcode'];
$spaceId = $_POST['spaceId'];
$studentId = $_POST['studentId'];
$date = $_POST['date'];
$time = date("H:i:s", strtotime($_POST['time']));

$sql = "INSERT INTO parking_spaces (space_id, student_id, `date`, `time`, qr_code) VALUES ('$spaceId', '$studentId', '$date', '$time', '$qrcode')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => $conn->error));
}

$conn->close();
?>