#!/usr/local/bin/php 
<?php
include("connection.php");
session_start();

switch ($_SERVER['REQUEST_METHOD']) {
	case "GET":

		$profile_name = $_GET['userName'];

		$query = $db->prepare("SELECT * FROM `profiles` WHERE `name`=:name");
		$query->execute(array(':name' => $profile_name));

		$result = $query->fetch();
		$_SESSION['profile_id'] = $result['profile_id'];
		break;
	case "POST":
		$profile_name = $_POST['name'];
		$profile_major = $_POST['major'];
		$profile_password = $_POST['password'];

		$query = $db->prepare("INSERT INTO `dn09uo`.`profiles` (`profile_id`, `name`, `major`, `password`) VALUES (NULL, :name, :major, :password);");
		$query->execute(array(':name' => $profile_name, ':major' => $profile_major, ':password' => $profile_password));
		$result = $query->fetch();
		break;
	case "DELETE":
		break;
}
$json = json_encode($result);
echo $json;
?>