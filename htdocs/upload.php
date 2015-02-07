<?php
	$UPLOADS_DIR = 'photos';


	$passwordHashFile = fopen("../password-hash.txt", "r") or die("Unable to load password configuration");
	$passwordHash = fgets($passwordHashFile);
	fclose($passwordHashFile);
	
	if ($passwordHash != md5($_POST["password"])) {
        	header("HTTP/1.1 401 Unauthorized");
        	error_log("Failed to authenticate with the client, wrong password");
		exit();
   	}


	$uploadedFileName = $_FILES["filedata"]["name"];
	$tempName = $_FILES["filedata"]["tmp_name"];

	$uploadedFileExtension = explode(".", $uploadedFileName)[1];

	$newFileName = time();
	$newFileName = strval($newFileName) . "." . $uploadedFileExtension;

	move_uploaded_file($tempName, "$UPLOADS_DIR/$newFileName");
	    
?>
