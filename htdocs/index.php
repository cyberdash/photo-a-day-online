<html>
	<head>
		<link rel="stylesheet" href="/css/grid.css" type="text/css" />
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="/js/jquery-debounce.js"></script>
		<script src="/js/jquery.lazyload.js" type="text/javascript"></script>

		<script src="/js/grid.js"></script>
	</head>

	<body>
		<div id="timeline">
			<?php
				$files = scandir("photos");
				foreach ($files as $file) {
					if (in_array($file, [".", ".."])) {
						continue;
					}
					$thumbnail = "/thumbnail.php?img=photos/$file&h=100";
					echo '<img data-filename="photos/', $file, '" data-original="', $thumbnail, '" class="photo-small"/>';
				}
			?>
		</div>
		<div id="preview"><img/></div>
	</body>
</html>