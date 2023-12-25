<?php
	require_once('config.php');

	$sql = 'SELECT MAX(userId) AS "userId" FROM csproject';

	$result = $conn->query($sql);
	$array = $result->fetch_assoc();
	echo $array["userId"];
	$conn->close();     
?>
