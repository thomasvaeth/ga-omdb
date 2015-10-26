var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res) {
	var data = req.body.id.split('_');
	var actorsArr = data[4].split(',');
	var actors = actorsArr[0] + ', ' + actorsArr[1];
	db.favorite.find({where: {imdbId: data[0]}}).then(function(createDelete) {
		if (createDelete !== null) {
			createDelete.destroy().then(function() {
				res.redirect('/favorites');
			});
		} else {
			db.favorite.create({imdbId: data[0], title: data[1], year: data[2], director: data[3], actor: actors}).then(function(movie) {
				res.redirect('/search/' + movie.imdbId);
			});
		}
	});
});

router.get('/', function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render('movies/favorites', {favorites: favorites});
	});
});

module.exports = router;