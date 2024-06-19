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
    header('Content-Type: application/json');
    echo json_encode(array("status" => "error", "message" => "Connection failed: ". $conn->connect_error));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $space_id = $_POST['space_id'];
    $start_datetime = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $reason = $_POST['reason'];

    $sql = "INSERT INTO parking_area_closures (space_id, start_datetime, end_date, reason) VALUES ('$space_id', '$start_datetime', '$end_date', '$reason')";

    if ($conn->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode(array("status" => "success"));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array("status" => "error", "message" => $conn->error));
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM parking_area_closures";
    $result = $conn->query($sql);

    $closures = array();
    while($row = $result->fetch_assoc()) {
        $closures[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($closures);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $closure_id = $data['closure_id'];

    $sql = "DELETE FROM parking_area_closures WHERE closure_id = '$closure_id'";

    if ($conn->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode(array("status" => "success"));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array("status" => "error", "message" => $conn->error));
    }
    exit();
}

$conn->close();
?>