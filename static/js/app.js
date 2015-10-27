$(document).ready(function() {
	// Stack Overflow - disable spaces in input field
	$('.tag-input').on({
		keydown: function(e) {
			if (e.which === 32) {
				return false
			}
		},
		change: function() {
			this.value = this.value.replace(/\s/g, '');
		}
	});
});