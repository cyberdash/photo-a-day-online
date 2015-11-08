<?php
	date_default_timezone_set('Australia/Sydney');
	$now = time(); // or your date as well
	$birthday = strtotime("1992-03-03");
	$datediff = $now - $birthday;
	$myAge = floor($datediff / (60*60*24*365));

?>

<html>
	<head>
		<link rel="stylesheet" href="css/general.css" type="text/css" />
		<link rel="stylesheet" href="css/grid.css" type="text/css" />
		<link href='http://fonts.googleapis.com/css?family=Lora:400,700italic' rel='stylesheet' type='text/css'>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="js/jquery-debounce.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js"></script>
		<script src="js/grid.js"></script>
		<script src="js/loadphotos.js"></script>
		<title>Josh Nelson – Photo a day</title>
	</head>

	<body>
		<div class="heading">
			<h1>One photo, every day</h1>
			<p> I have taken a photograph of my face every day since I was 17. I am currently <?php echo $myAge ?>.</p>
		</div>
		<div id="grid">
			
		</div>
	</body>
</html>