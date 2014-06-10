<html>
	<head>
		<link rel="stylesheet" href="/css/timeline.css" type="text/css" />
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="/js/jquery-debounce.js"></script>
		<script src="/js/timeline.js"></script>
	</head>

	<body>
		<div id="timeline">
			<?php
				$files = scandir("photos");
				foreach ($files as $file) {
					if (in_array($file, [".", ".."])) {
						continue;
					}
					$thumbnail = "/thumbnail.php?img=photos/$file&h=150";
					echo '<img data-filename="photos/', $file, '" src="', $thumbnail, '" class="pad-photo"/>';
				}
			?>
		</div>
		<div id="preview"><img/></div>
	</body>
</html>