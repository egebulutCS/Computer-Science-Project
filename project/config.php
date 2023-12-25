<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
	$DB_SERVER = 'localhost';
	$DB_USERNAME = 'guest';
	$DB_PASSWORD = '9XBg-W#c63c@Z7Pj';
	$DB_NAME =  'userlogin';
	 
	/* Attempt to connect to MySQL database */
	$conn = new mysqli($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
	 
	// Check connection
	if($conn->connect_error){
	    die("ERROR: Could not connect. " . $mysqli->connect_error);
	}
?>
