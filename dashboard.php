<?php
session_start();

if(!isset($_SESSION['login_user'])){
    header("location:login.html");
    die();
}

echo "Welcome " . $_SESSION['login_user'] . "!<br>";
echo "Role: " . $_SESSION['role'] . "<br>";
echo "<a href='process_logout.php'>Logout</a>";
?>
