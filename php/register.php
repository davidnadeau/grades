<?
if( $_POST )
{
  include("common.php");
  $profile_name = $_POST['name'];
  $profile_major = $_POST['major'];
  $profile_password = $_POST['password'];

  $profile_name = mysql_real_escape_string($profile_name);
  $profile_major = mysql_real_escape_string($profile_major);
  $profile_password = mysql_real_escape_string($profile_password);

  $query = "
  INSERT INTO  `dn09uo`.`profiles` (`profile_id` ,`name` ,`major` ,`password`)
  VALUES (NULL, '$profile_name','$profile_major', '$profile_password')";

  try {
    $rows = $db->query($query);
  } 
  catch (PDOException $ex) {
    print "<p>Sorry, a database error occurred. Please try again later.</p>";
    print "Error details: ".$ex->getMessage()."<br />";
  }
}
?>