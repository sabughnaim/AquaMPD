<?php
	
	require 'class.googlevoice.php';
	if (isset($_POST['message']) and isset($_POST['number'])) {
		$message=$_POST['message'];
		$number=$_POST['number'];
		$gv = new GoogleVoice("aquashhnote@gmail.com", "noteAqua");
		$gv->sms($number, $message);
		echo 'Done';
	} else {
		echo 'Connected';
	}
?>