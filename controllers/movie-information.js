var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:idx', function(req, res) {
	var idx = req.params.idx;
	request('http://www.omdbapi.com/?i=' + idx + '&tomatoes=true', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body);
			res.render('movies/show', data);
		}
	});
});

module.exports = router;