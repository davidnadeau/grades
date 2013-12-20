#!/usr/bin/php-cgi
<?php
if( $_POST )
{
  include("common.php");
  $profile_name = $_POST['name'];
  $profile_major = $_POST['major'];
  $profile_password = $_POST['password'];

  $query = $db->prepare("INSERT INTO `dn09uo`.`profiles` (`profile_id`, `name`, `major`, `password`) VALUES (NULL, :name, :major, :password);");
  $query->execute(array(':name' => $profile_name, ':major' => $profile_major, ':password' => $profile_password));

  header( "Location: /~dn09uo/project/grades/" );
}
?>