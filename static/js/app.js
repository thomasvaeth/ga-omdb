$(document).ready(function() {
	$('form').submit(function(e) {
		search = $('input').val();
		if (search === '') {
			e.preventDefault();
			$('button').removeClass('btn-success');
			$('button').addClass('btn-danger');
			$('input').addClass('input-danger')
		} else {
			$('input').removeClass('input-danger');
			$('button').removeClass('btn-danger');
			$('button').addClass('btn-success');
		}
	});
});