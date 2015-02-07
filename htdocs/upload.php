<?php
	$UPLOADS_DIR = 'photos';

	
	$uploadedFileName = $_FILES["filedata"]["name"];
	$tempName = $_FILES["filedata"]["tmp_name"];

	$uploadedFileExtension = explode(".", $uploadedFileName)[1];

	$newFileName = time();
	$newFileName = strval($newFileName) . "." . $uploadedFileExtension;

	move_uploaded_file($tempName, "$UPLOADS_DIR/$newFileName");
	    
?>