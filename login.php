<?php
session_start();
require('db.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    
    $sql = "SELECT id FROM users WHERE username = '$username' and password = '$password' and role = '$role'";
    $result = $conn->query($sql);
    
    if (mysqli_num_rows($result) === 1) {
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password
        $_SESSION['role'] = $role;
        header("location: dashboard.php");
    } 
        if($_SESSION['role']==$role){
            switch ($_SESSION['role']){
                case "Student":
                    header("location: dashboard.php");
                    break;
                case "Staff":
                    header("location: admin_dashboard.php");
                    break;
                default:
                    echo "Invalid role.";
            }
            exit;
        }
    
    else {
        echo "<script>alert('Invalid username, password, or role');</script>";
    }
}
?>
