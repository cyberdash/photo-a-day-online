$(function(GRID) {
	$.getJSON('photolist.php', function(allPhotos) {
		var $container = $('#grid');

		function loadNewPhoto() {
			var newPhotoMarkup = allPhotos.shift();
			var $newPhoto = $(newPhotoMarkup);
			$container.append($newPhoto);
			return newPhotoMarkup;
		}

		function loadMorePhotos(newPhotos) {
			if (!allPhotos.length) {
				return;
			}

			for (var i = 0; i < newPhotos; i++) {
				var wasNewPhoto = loadNewPhoto();
			}
			$container.waitForImages(function() {
				ScalePhotos.scaleImagesToScreenWidth();	
			});
		}

		$(window).scroll($.debounce(function(){
			var buffer = 400;
			var nearBottom = document.body.scrollTop + window.innerHeight > document.body.scrollHeight - buffer;
			if (nearBottom) {
				loadMorePhotos(100);
			}
		}, 500));


		loadMorePhotos(100);



	});




});