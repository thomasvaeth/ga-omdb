var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/favorites/:idx/tags', function(req, res) {
	var idx = req.params.idx;
	var tagList = req.body.tag;
	db.favorite.findById(idx).then(function(favorite) {
		db.tag.findOrCreate({where: {name: tagList}}).spread(function(tag, created) {
			favorite.addTag(tag).then(function() {
				res.redirect('/favorites/' + idx + '/tags')
			});
		});
	});
});

router.get('/favorites/:idx/tags', function(req, res) {
	var idx = req.params.idx;
	db.favorite.find({where: {id: idx}}).then(function(favorite) {
		favorite.getTags().then(function(tags) {
			res.render('tags/movie-tags', {favorite: favorite, tags: tags});
		});
	});
});

router.get('/tags', function(req, res) {
	db.tag.findAll().then(function(tags) {
		res.render('tags/all-tags', {tags: tags});
	});
});

router.get('/favorites/:idx', function(req, res) {
	var idx = req.params.idx;
	db.tag.find({where: {id: idx}}).then(function(tag) {
		tag.getFavorites().then(function(favorites) {
			res.render('movies/favorites', {favorites: favorites})
		})
	})
});

module.exports = router;