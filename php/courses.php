#!/usr/local/bin/php
<?php
include("connection.php");

if (isset($_SESSION['profile_id'])) {
	switch ($_SERVER['REQUEST_METHOD']) {

		case "GET":
			$profile_id = $_SESSION['profile_id'];
			$query = $db->prepare($sql = "SELECT * FROM `courses` WHERE `profile_id`=:profile_id;");
			$query->execute(array(':profile_id' => $profile_id));
			$result = $query->fetchAll();
			break;
		case "POST":
			$postdata = file_get_contents("php://input");
			$bulk_data = json_decode($postdata)->bulkData;

			$db->beginTransaction();
			$query = $db->prepare("INSERT INTO `dn09uo`.`courses` (`id`, `subject`, `number`, `year`, `weight`, `mark`, `profile_id`, `credit`) VALUES (NULL, :subject, :number, :year, :weight, :mark, :profile_id, :credit);");

			foreach($bulk_data as $row) {
				if (!empty($row->mark)) {
					$query->execute(array(':subject' => $row->subject, ':number' => $row->number, ':year' => $row->year,':weight' => $row->weight, ':mark' => $row->mark, ':profile_id' => $_SESSION['profile_id'], ':credit' => $row->credit));
				}
			}

			$result = $db->commit();
			break;
		case "DELETE":
			break;

	}
	$json = json_encode($result);
	echo $json;
}
return;
?>