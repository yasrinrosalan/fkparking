<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FKParking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$space_id = $_POST['space_id'];
$student_id = $_POST['student_id'];
$date = $_POST['date'];
$time = $_POST['time'];
$qr_code = 'QR_CODE_' . $space_id . '_' . $student_id . '_' . $date . '_' . $time;

$sql = "INSERT INTO bookings (space_id, student_id, date, time, qr_code) VALUES ('$space_id', '$student_id', '$date', '$time', '$qr_code')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true, 'qr_code' => $qr_code));
} else {
    echo json_encode(array('success' => false, 'error' => $conn->error));
}

$conn->close();
?>
