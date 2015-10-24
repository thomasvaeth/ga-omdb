var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	var movieQuery = req.query.q;
	if (!movieQuery) {
		res.redirect('/');
	} else {
		request('http://www.omdbapi.com/?s=' + movieQuery, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				if (data.Response === "False") {
					res.redirect('/')
				} else {
					res.render('movies/index', data);
				}
			}
		});
	}
});

module.exports = router;