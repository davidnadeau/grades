#!/usr/local/bin/php 
<?php
/*
@author		David Nadeau
@page		users.php
@purpose	REST api for users 
*/

include("connection.php");
//import hashing algorithm *bcrypt
require('./PasswordHash.php');
//bcrypt hashing algorithm
$hasher = new PasswordHash(8,FALSE);

switch ($_SERVER['REQUEST_METHOD']) {
	case "GET":
		$user_data = json_decode($_GET['userData']);
		$user_name = $user_data->userName;
		$user_password = $user_data->userPassword;
		
		$query = $db->prepare("SELECT * FROM `profiles` WHERE `name`=:name");
		$query->execute(array(':name' => $user_name));

		$result = $query->fetch();

		//if user is logged in, just return profile
		//otherwise check if password is correct and log in
		if (empty($user_data->loggedIn)) {
			if ($hasher->CheckPassword($user_password, $result['password'])) {
				$_SESSION['profile_id'] = $result['profile_id'];
			}
			else {
				$result = false;
			}
		}
		break;
	case "POST":
		// $_POST is empty when using angular resouce to send post,
		// this hack is the only way to see the data
		$postdata = file_get_contents("php://input");
		$user_data = json_decode($postdata)->userData;
		$user_name = $user_data->userName;
		$user_password = $user_data->userPassword;
		$user_major = $user_data->userMajor;

		//bcrypt algorithm for hashing
    	$hash = $hasher->HashPassword($user_password);
    	
		$query = $db->prepare("INSERT INTO `dn09uo`.`profiles` (`profile_id`, `name`, `major`, `password`) VALUES (NULL, :name, :major, :password);");
		$query->execute(array(':name' => $user_name, ':major' => $user_major, ':password' => $hash));
		//return user
		$query = $db->prepare("SELECT * FROM `profiles` WHERE `name`=:name");
		$query->execute(array(':name' => $user_name));
		$result = $query->fetch();
		$_SESSION['profile_id'] = $result['profile_id'];
		break;
}
$json = json_encode($result);
echo $json;
return;
?>