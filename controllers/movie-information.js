var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get('/:idx', function(req, res) {
	var idx = req.params.idx;
	var favorited = false;
	var back = req.headers.referer;
	db.favorite.find({where: {imdbId: idx}}).then(function(alreadyFavorited) {
		if (alreadyFavorited) {
			favorited = true;
		}
	}).then(function() {
		request('http://www.omdbapi.com/?i=' + idx + '&tomatoes=true&apikey=c62c7f29', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render('movies/show', {data: data, back: back, favorited: favorited});
			}
		});
	})
});

module.exports = router;