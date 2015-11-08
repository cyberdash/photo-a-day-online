var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var video = document.querySelector('video');

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
    canvas.classList.add('hidden');
    document.getElementById('controls').classList.add('hidden');
}

function enterUploadMode () {
    canvas.classList.remove('hidden');
    video.classList.add('hidden');
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
    video.addEventListener('click', function () {
        canvas.classList.add('hidden');
        takePhoto(localMediaStream)
    }, false);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
        // Ready to go. Do some stuff.
    };
}, errorCallback);

document.getElementById('upload').addEventListener('click', function () {
    var blob = dataURLtoBlob(getImageDataUrl(canvas), 'upload.png');
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