export const scrollUpTo = function($el) {
	var top = $el.offset().top;

	if ($(document).scrollTop() > top) {
		$('html, body').animate({
			scrollTop: top
		}, 300);
	}
}