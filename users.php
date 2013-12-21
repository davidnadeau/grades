#!/usr/local/bin/php 
<?php
include("connection.php");

switch ($_SERVER['REQUEST_METHOD']) {
	case "GET":
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
		$json = json_encode($result);
		echo $json;
		break;
	case "POST":
		// $_POST is empty when using angular resouce to send post(wtf),
		// this nasty hack is the only way to see the data....
		$postdata = file_get_contents("php://input");
		$user_data = json_decode($postdata)->userData;
		$user_name = $user_data->userName;
		$user_password = $user_data->userPassword;
		$user_major = $user_data->userMajor;

		$query = $db->prepare("INSERT INTO `dn09uo`.`profiles` (`profile_id`, `name`, `major`, `password`) VALUES (NULL, :name, :major, :password);");
		$query->execute(array(':name' => $user_name, ':major' => $user_major, ':password' => $user_password));
		break;
}
?>