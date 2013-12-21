#!/usr/local/bin/php 
<?php
include("connection.php");

switch ($_SERVER['REQUEST_METHOD']) {
	case "GET":
		/*//check if logged in
		if (isset($_SESSION['profile_id'])) {
			$result = true;
		}
		//log in
		else {*/

		$user_data = json_decode($_GET['userData']);
		$user_name = $user_data->userName;
		$user_password = $user_data->userPassword;
		$query = $db->prepare("SELECT * FROM `profiles` WHERE `name`=:name");
		$query->execute(array(':name' => $user_name));

		$result = $query->fetch();
		if ($user_password == $result['password'])
			$_SESSION['profile_id'] = $result['profile_id'];
		else {
			$result = false;
		}
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