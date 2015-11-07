$(function(){

	var LOADING_CLASS = 'loading';

	function getCenterImageSource() {
		var centerElement = document.elementFromPoint($(document).width() / 2, $(document).height() / 2);
		var centerImageSource = $(centerElement).attr('data-filename');
		return centerImageSource;
	}

	function startLoading($el) {
		$el.addClass(LOADING_CLASS);
	}

	function stopLoading($el) {
		$el.removeClass(LOADING_CLASS);
	}

	function isLoading($el) {
		return $el.hasClass(LOADING_CLASS);
	}

	$(window).scroll(function() {
		var $preview = $('#preview');
		if (!isLoading($preview)) {
			startLoading($preview);
		}

	});
	$(window).scroll($.debounce(function(){
		var $preview = $('#preview');

		stopLoading($preview);

		$preview.hide();
		var newImageSource = getCenterImageSource();
		$preview.show();

		var $newImage = $('<img/>').attr('src', newImageSource);

		$preview.append($newImage);
		$preview.find('img').first().remove();
	}, 500));
});