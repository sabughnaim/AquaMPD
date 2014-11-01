<?php
	if (isset($_POST['message'])) {
		$message=$_POST['message'];
		echo $message;
	} else {
		echo 'connected';
	}
?>