<?php
	require_once('config.php');
	$userId = mysqli_real_escape_string($conn, $_POST['userId']);
	$combination = mysqli_real_escape_string($conn, $_POST['combination']);
	$time = mysqli_real_escape_string($conn, $_POST['time']);
	$position = mysqli_real_escape_string($conn, $_POST['position']);
 
	$sql = "INSERT INTO csproject (userId,combination,time,position) VALUES ('$userId', '$combination', '$time', '$position')";

	if ($conn->query($sql) === TRUE) {
		echo "Page Saved!";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$conn->close();
?>
