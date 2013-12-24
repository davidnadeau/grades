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
			$data = json_decode($postdata);
			//if bulkData not sent, this is a hacked delete request
			$deleting = !array_key_exists('bulkData', get_object_vars($data));

			//DELETE and PUT give 403, hack delete into post method :/
			if ($deleting) {
				$query = $db->prepare($sql = "DELETE FROM `courses` WHERE `id`=:id;");
				$id = $data->id;
				$result = $query->execute(array(':id' => $id));
			}
			else {
				$bulk_data = $data->bulkData;
				$db->beginTransaction();
				$query = $db->prepare("INSERT INTO `dn09uo`.`courses` (`id`, `subject`, `number`, `year`, `weight`, `mark`, `profile_id`, `credit`) VALUES (NULL, :subject, :number, :year, :weight, :mark, :profile_id, :credit);");

				foreach($bulk_data as $row) {
					if (!empty($row->mark)) {
						$query->execute(array(':subject' => $row->subject, ':number' => $row->number, ':year' => $row->year,':weight' => $row->weight, ':mark' => $row->mark, ':profile_id' => $_SESSION['profile_id'], ':credit' => $row->credit));
					}
				}

				$db->commit();
			}
			break;
	}
	$json = json_encode($result);
	echo $json;
}
return;
?>