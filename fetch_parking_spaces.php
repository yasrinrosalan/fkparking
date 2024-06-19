<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fkparking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$student_id = $_GET['student_id'];

$sql = "SELECT * FROM parking_spaces WHERE student_id = '$student_id'";
$result = $conn->query($sql);

$parking = array();
while($row = $result->fetch_assoc()) {
    $parking[] = $row;
}

echo json_encode($parking);

$conn->close();
?>
