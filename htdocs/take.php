<html>
	<head>
    </head>
    <body>
        <h1>Take a photo</h1>
        <form onsubmit="return false" action="../upload.php" method="POST">
            <input id="photo-file" name="filedata" type="hidden">
            <video autoplay></video>
            <canvas width="640" height="480"></canvas>
            <label for="password">Password</label><input name="password" id="password" type="password">
        </form>
        <button id="upload">Upload</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.10.1/fetch.js"></script>
        <script src="js/take.js"></script>
    </body>
</html>