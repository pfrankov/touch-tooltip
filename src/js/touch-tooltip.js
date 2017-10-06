(function($){

	var APPLY_TOOLTIP_CLASS = ".ApplyTooltip",
		TOUCH_TOOLTIP_CLASS = ".TouchTooltip";

	var $window = $(window); // Cache window object

	// iOS fake hover hack
	if ( /AppleWebKit/i.test(navigator.userAgent) && /(iPod|iPhone|iPad)/i.test(navigator.userAgent) ) {

		$(document).on("touchstart click", APPLY_TOOLTIP_CLASS, function(event){
			$(this).addClass("iOS");

			if ( $(this).is("a") ) {
				event.preventDefault();
			}

			$(".fakeHover").not(this).removeClass("fakeHover");
			$(this).addClass("fakeHover");
		});

	}


	$(document).on("mouseover touchstart click", APPLY_TOOLTIP_CLASS, function(){
		var $this = $(this);
		var $tooltip = $this.children(TOUCH_TOOLTIP_CLASS);

		// Quick ApplyTooltip
		if ( !$tooltip.length && $this.attr("title") && $this.attr("title").length ) {
			$tooltip = $("<span/>" ).addClass("TouchTooltip");

			var title = $this.attr("title");
			$this.removeAttr("title"); // we don't need it anymore

			if ( $this.data("styles") && $this.data("styles").length ) {
				$tooltip.addClass( $this.data("styles") );
			}else {
				$tooltip.addClass("Shadow Round Bottom Default");
			}

			var $content = $("<span/>" ).addClass("Content");

			$this.append(
					$tooltip.append(
							$content.html( title )
					)
			);
		}

		// Vertical centering for Left and Right
		if ($tooltip.hasClass("Center")) {
			$tooltip.addClass("AnimationStopped").css({
				top: ($tooltip.parent().outerHeight(true) - $tooltip.outerHeight(true))/2
			});
		}

		// Processing edges
		var overlap = getTooltipOverlap($tooltip);

		if ( overlap.exist ) {
			// Save original class list
			var originalClasses = $tooltip.get(0).className;

			var tooltipClassList = ["Top", "Top Center", "Top Left", "Top Right", "Right Center", "Bottom", "Bottom Left", "Bottom Right", "Bottom Center", "Left Center"],
				availablePositions = [];


			for (var i = 0; i < tooltipClassList.length; i++) {
				$tooltip.removeClass("Top Right Bottom Left Center");

				$tooltip.addClass( tooltipClassList[i] );

				if ( !getTooltipOverlap($tooltip).exist ) {
					availablePositions.push( tooltipClassList[i] ); // We found it!
				}
			}
			if ( availablePositions.length ) {
				for (var i = 0; i < availablePositions.length; i++) {
					if ( originalClasses.indexOf("Top") > 0 ) {

					}
				}
			} else {
				// Tooltip can not be placed without overlapping.
			}
		}


	}).on("click", APPLY_TOOLTIP_CLASS, function (event){
		if ( $(this).is("a") ) {
			event.preventDefault();
		}
	}).on("mouseout touchend", APPLY_TOOLTIP_CLASS, function(){
		var $tooltip = $(this).children(TOUCH_TOOLTIP_CLASS);

		// Vertical centering for Left and Right
		$tooltip.removeClass("AnimationStopped");
	});

	function getTooltipOverlap( $tooltip ){
		var tooltipOffset = $.extend($tooltip.offset(), {
			width: $tooltip.outerWidth(true),
			height: $tooltip.outerHeight(true)
		});
		var windowOffset = {
			top: $window.scrollTop(),
			left: $window.scrollLeft(),
			width: $window.width(),
			height: $window.height()
		};

		var overlap = {
			exist: false,
			top: false,
			right: false,
			bottom: false,
			left: false
		};

		if ( tooltipOffset.top < windowOffset.top ) { // Exceed from top
			overlap.top = true;
			overlap.exist = true;
		}
		if ( tooltipOffset.left + tooltipOffset.width > windowOffset.left + windowOffset.width ) { // Exceed from right
			overlap.right = true;
			overlap.exist = true;
		}
		if ( tooltipOffset.top + tooltipOffset.height > windowOffset.top + windowOffset.height ) { // Exceed from bottom
			overlap.bottom = true;
			overlap.exist = true;
		}
		if ( tooltipOffset.left < windowOffset.left ) { // Exceed from left
			overlap.left = true;
			overlap.exist = true;
		}

		return overlap;
	}

})(jQuery);