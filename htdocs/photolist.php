<?php
$photo_list = array();

$files = scandir("photos");
foreach ($files as $file) {
	if (in_array($file, [".", ".."])) {
		continue;
	}
	$thumbnail = "/thumbnail.php?img=photos/$file&h=100";
	$photo_markup = '<img data-filename="photos/' . $file . '" src="' . $thumbnail . '" data-original="' . $thumbnail . '" class="photo-small"/>';
	array_push($photo_list, $photo_markup);
}

echo json_encode($photo_list, JSON_HEX_QUOT | JSON_HEX_TAG);

?>