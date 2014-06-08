<?php
	$UPLOADS_DIR = 'photos';

	function countFiles($directory) {
		// integer starts at 0 before counting
	    $fileCount = 0; 
	    if ($handle = opendir($directory)) {
	        while (($file = readdir($handle)) !== false) {
	            if (!in_array($file, array('.', '..')) && !is_dir($directory.$file)) 
	                $fileCount++;
	        }
	    }
	    return $fileCount;
	}

	
	$uploadedFileName = $_FILES["filedata"]["name"];
	$tempName = $_FILES["filedata"]["tmp_name"];

	$uploadedFileExtension = explode(".", $uploadedFileName)[1];

	$filesInDirectory = countFiles($UPLOADS_DIR);
	$newFileName = $filesInDirectory + 1;
	$newFileName = strval($newFileName) . "." . $uploadedFileExtension;

	move_uploaded_file($tempName, "$UPLOADS_DIR/$newFileName");
	    
?>