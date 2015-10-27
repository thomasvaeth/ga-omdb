$(document).ready(function() {
	
	$('form').submit(function(e) {
		search = $('input').val();
		if (search === '') {
			e.preventDefault();
			$('.btn-input').removeClass('btn-success');
			$('.btn-input').addClass('btn-danger');
			$('input').addClass('input-danger');
			$('textarea').addClass('input-danger');
		} else {
			$('input').removeClass('input-danger');
			$('textarea').removeClass('input-danger');
			$('.btn-input').removeClass('btn-danger');
			$('.btn-input').addClass('btn-success');
		}
	});

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