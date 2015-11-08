<?php
	$UPLOADS_DIR = 'photos';


	$passwordHashFile = fopen("../password-hash.txt", "r") or die("Unable to load password configuration");
	$passwordHash = fgets($passwordHashFile);
	fclose($passwordHashFile);
	
	if ($passwordHash != md5($_POST["password"])) {
        	header("HTTP/1.1 401 Unauthorized");
        	error_log("Failed to authenticate with the client, wrong password");
        	error_log($passwordHash . '!=' . md5($_POST["password"]));
		exit();
   	}


	function getExtension ($mime_type){
		$extensions = array(
                'image/jpeg' => 'jpeg',
                'image/jpg' => 'jpeg',
                'image/gif' => 'gif',
                'image/png' => 'png'
		);

		return $extensions[$mime_type];
	}


	$tempName = $_FILES["filedata"]["tmp_name"];

    print_r($_FILES["filedata"]);

	$uploadedFileExtension = getExtension($_FILES["filedata"]["type"]);

	$newFileName = time();
	$newFileName = strval($newFileName) . "." . $uploadedFileExtension;

	move_uploaded_file($tempName, "$UPLOADS_DIR/$newFileName");
	    
?>
