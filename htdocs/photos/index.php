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
				echo '<img src="', $file, '" class="pad-photo"/>';
			}
		?>
	</body>
</html>