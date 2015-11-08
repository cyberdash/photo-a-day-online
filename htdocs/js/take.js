var screenshotCanvas = document.getElementById('video-screenshot');
var ctx = screenshotCanvas.getContext('2d');
var video = document.querySelector('video');
var videoOverlay = document.getElementById('video-overlay');
var errorCallback = function(e) {
    console.log('Could not load video, rejected', e);
};

//From http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
function dataURLtoBlob (dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type:mime
    });
}

function enterTakePhotoMode () {
    video.classList.remove('hidden');
    screenshotCanvas.classList.add('hidden');
    videoOverlay.classList.remove('hidden');
    document.getElementById('controls').classList.add('hidden');
}

function enterUploadMode () {
    screenshotCanvas.classList.remove('hidden');
    video.classList.add('hidden');
    videoOverlay.classList.add('hidden');
    document.getElementById('controls').classList.remove('hidden');
}

function takePhoto(localMediaStream) {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
    }
    enterUploadMode();
}

function getImageDataUrl (canvas) {
    return canvas.toDataURL('image/png');
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
    video.src = window.URL.createObjectURL(localMediaStream);
    videoOverlay.addEventListener('click', function () {
        screenshotCanvas.classList.add('hidden');
        takePhoto(localMediaStream);
    }, false);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
        // Ready to go. Do some stuff.
    };
}, errorCallback);

function renderVideoOverlay (canvas) {
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    function coords(percentX, percentY) {
        return {
            x: percentX * width,
            y: percentY * height
        };
    }

    function percentMoveTo(percentX, percentY) {
        var absCoords = coords(percentX, percentY);
        ctx.moveTo(absCoords.x, absCoords.y);
    }

    function percentLineTo(percentX, percentY) {
        var absCoords = coords(percentX, percentY);
        ctx.lineTo(absCoords.x, absCoords.y);
    }

    ctx.beginPath();
    ctx.strokeStyle = 'lime';
    //Box
    percentMoveTo(0.3, 0.1);
    percentLineTo(0.7, 0.1);
    percentLineTo(0.7, 0.75);
    percentLineTo(0.3, 0.75);
    percentLineTo(0.3, 0.1);

    //Left eye
    var size = 0.02;
    percentMoveTo(0.43, 0.45);
    percentLineTo(0.43 - size, 0.45);
    percentLineTo(0.43 + size, 0.45);
    percentMoveTo(0.43, 0.45);
    percentLineTo(0.43, 0.45 - size);
    percentLineTo(0.43, 0.45 + size);

    //Right eye
    percentMoveTo(0.57, 0.45);
    percentLineTo(0.57 - size, 0.45);
    percentLineTo(0.57 + size, 0.45);
    percentMoveTo(0.57, 0.45);
    percentLineTo(0.57, 0.45 - size);
    percentLineTo(0.57, 0.45 + size);

    ctx.stroke();

    canvas.addEventListener('mousemove', function (e) {
        console.log((e.clientX / width - 0.25) + ',' + (e.clientY / height - 0.24));
    });
}

renderVideoOverlay(videoOverlay);

document.getElementById('upload').addEventListener('click', function () {
    var blob = dataURLtoBlob(getImageDataUrl(screenshotCanvas), 'upload.png');
    var data = new FormData();
    data.append('filedata', blob);
    data.append('password', document.getElementById('password').value);

    fetch('upload', {
        method: 'post',
        body: data
    }).then(function (response) {
        if (response.status === 200) {
            toastr.success('Photo uploaded successfully');
        }
        enterTakePhotoMode();
    });
});

document.getElementById('cancel').addEventListener('click', enterTakePhotoMode);