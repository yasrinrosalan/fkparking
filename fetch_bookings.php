<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FKParking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$student_id = $_GET['student_id'];

$sql = "SELECT * FROM bookings WHERE student_id = '$student_id'";
$result = $conn->query($sql);

$bookings = array();
while($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode($bookings);

$conn->close();
?>
