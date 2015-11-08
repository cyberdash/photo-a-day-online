<html>
	<head>
        <link href='http://fonts.googleapis.com/css?family=Lora:400,700italic' rel='stylesheet' type='text/css'>
        <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="css/general.css" type="text/css" />
        <link rel="stylesheet" href="css/take.css" type="text/css" />
        <title>PAD: upload</title>
    </head>
    <body>
        <div class="heading">
            <h1>Take a photo</h1>
        </div>
        <div class="take-photos">
            <video autoplay></video>
            <canvas class="hidden" width="640" height="480"></canvas>
        </div>
        <div id="controls" class="hidden">
            <input placeholder="Password" name="password" id="password" type="password">
            <button id="upload">Upload</button>
            <button id="cancel">Cancel</button>
        </div>
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.10.1/fetch.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.js"></script>
        <script src="js/take.js"></script>
    </body>
</html>