#!/usr/bin/php-cgi
<?php

$SERVER   = "localhost";
$USERNAME = "dn09uo";
$PASSWORD = "8Ns6qADAvuPr8sss";
$DATABASE = "dn09uo";

$db = new PDO("mysql:dbname={$DATABASE}; host={$SERVER}", $USERNAME, $PASSWORD);
$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

?>