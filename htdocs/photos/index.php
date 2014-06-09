<html>
	<head>
		<link rel="stylesheet" href="/css/photos.css" type="text/css" />
	</head>

	<body>
		<?php
			$files = scandir(".");
			foreach ($files as $file) {
				if (in_array($file, [".", "..", "index.php"])) {
					continue;
				}
				$thumbnail = "/thumbnail.php?img=photos/$file&h=100";
				echo '<img src="', $thumbnail, '" class="pad-photo"/>';
			}
		?>
	</body>
</html>