$(function () {
	
	function resetImageSizes($images) {
		$images.each(function(){
			$(this).attr("style", "");
		});
	}

	function scaleRowToWidth($row) {
		var currentRowWidth = 0;

		$row.each(function(){
			currentRowWidth += $(this).width();
		});

		var desiredRowWidth = $(document).width();
		var scaleFactor = desiredRowWidth / currentRowWidth;

		$row.each(function() {
			var $el = $(this);

			var newWidth = $el.width() * scaleFactor;
			var newHeight = $el.height() * scaleFactor;
			$el.width(newWidth);
			$el.height(newHeight);
		});
	}

	function scaleImagesToScreenWidth() {
		var currentX = 0;
		var $currentRow = $();
		var $allPhotos = $('.photo-small');

		resetImageSizes($allPhotos);

		$allPhotos.each(function() {
			var $this = $(this);

			currentX += $this.width();

			if (currentX > $(document).width()) {
				scaleRowToWidth($currentRow);
				$currentRow = $(this);
				currentX = $this.width();
			} else {
				$currentRow = $currentRow.add($this);
			}

		});
	}

	$(window).resize($.debounce(function(){
		scaleImagesToScreenWidth();
	}, 100));

	scaleImagesToScreenWidth();

	window.ScalePhotos = {};
	window.ScalePhotos.scaleImagesToScreenWidth = scaleImagesToScreenWidth;
	
});