#!/usr/local/bin/php
<?php
include("connection.php");
session_start();

if (isset($_SESSION['profile_id'])) {
	switch ($_SERVER['REQUEST_METHOD']) {

		case "GET":
			$profile_id = $_SESSION['profile_id'];
			$query = $db->prepare($sql = "SELECT * FROM `courses` WHERE `profile_id`=:profile_id;");
			$query->execute(array(':profile_id' => $profile_id));
			$result = $query->fetchAll();
			break;
		case "POST":
			break;
		case "DELETE":
			break;

	}
	$json = json_encode($result);
	echo $json;
}
return;
/*if( $_POST )
{
	$db->beginTransaction();

	$query = $db->prepare("INSERT INTO `dn09uo`.`courses` (`id`, `subject`, `number`, `year`, `weight`, `mark`, `profile_id`, `credit`) VALUES (NULL, :subject, :number, :year, :weight, :mark, :profile_id, :credit);");

	foreach($valuesToInsert as $insertRow){

// now loop through each inner array to match binded values
		foreach ($insertRow as $column => value) {
			$stmt->bindParam(":{$column}", value);
			$stmt->execute();
		}
	}


	$dbh->commit();
	$query->execute(array(':name' => $profile_name, ':major' => $profile_major, ':password' => $profile_password));

	header( "Location: /~dn09uo/project/grades/" );
}*/
?>