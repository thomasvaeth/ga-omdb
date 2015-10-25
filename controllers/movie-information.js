var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get('/:idx', function(req, res) {
	var idx = req.params.idx;
	var favorited = false;
	db.favorite.find({where: {imdbId: idx}}).then(function(alreadyFavorited) {
		if (alreadyFavorited) {
			favorited = true;
		}
	}).then(function() {
		request('http://www.omdbapi.com/?i=' + idx + '&tomatoes=true', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render('movies/show', {data: data, favorited: favorited});
			}
		});
	})
});

module.exports = router;