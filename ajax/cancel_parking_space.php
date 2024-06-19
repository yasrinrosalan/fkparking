<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With');

include "../db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $spaceId = $_POST["spaceId"];

  // Prepare and execute a query to delete the parking space
  $stmt = $conn->prepare("DELETE FROM parking_spaces WHERE space_id =?");
  $stmt->bind_param("i", $spaceId);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {
    echo json_encode(array('success' => true));
  } else {
    echo json_encode(array('success' => false));
  }
}

$conn->close();
?>