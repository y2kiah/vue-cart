export const scrollUpTo = function($el, topMargin) {
	if (topMargin === undefined) {
		topMargin = 0;
	}

	let top = $el.offset().top - topMargin;

	if ($(document).scrollTop() > top) {
		$('html, body').animate({
			scrollTop: (top < 0 ? 0 : top)
		}, 200);
	}
}

export const scrollDownTo = function($el, topMargin) {
	if (topMargin === undefined) {
		topMargin = 0;
	}

	let top = $el.offset().top - topMargin;

	if ($(document).scrollTop() < top) {
		$('html, body').animate({
			scrollTop: (top < 0 ? 0 : top)
		}, 200);
	}
}