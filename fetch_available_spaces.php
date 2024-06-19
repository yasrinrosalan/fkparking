<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FKParking";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['date'])) {
    $date = $_GET['date'];

    // Convert the date format to Y-m-d
    $formatted_date = DateTime::createFromFormat('Y-m-d', $date)->format('Y-m-d');

    $sql = "SELECT * FROM daily_parking_availability WHERE date = '$formatted_date'";
    $result = $conn->query($sql);

    if ($result) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(array("error" => "Query failed: " . $conn->error));
    }
} else {
    echo json_encode(array("error" => "No date provided."));
}

$conn->close();
?>
