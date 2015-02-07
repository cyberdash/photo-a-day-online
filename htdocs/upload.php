<?php
	$UPLOADS_DIR = 'photos';

    $password = getenv("PAD_PASSWORD");

if ($password != $_POST["password"]) {
        header("HTTP/1.1 401 Unauthorized");
        exit();
    }

	$uploadedFileName = $_FILES["filedata"]["name"];
	$tempName = $_FILES["filedata"]["tmp_name"];

	$uploadedFileExtension = explode(".", $uploadedFileName)[1];

	$newFileName = time();
	$newFileName = strval($newFileName) . "." . $uploadedFileExtension;

	move_uploaded_file($tempName, "$UPLOADS_DIR/$newFileName");
	    
?>