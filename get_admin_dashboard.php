<?php
include 'db.php';

// Sample data for dashboard
$data = [
    'totalParkingSpaces' => 100,
    'totalAvailableSpaces' => 50,
    'totalClosedSpaces' => 10,
];

echo json_encode($data);

$conn->close();
?>
