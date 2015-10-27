var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/:idx/tags', function(req, res) {
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

router.get('/:idx/tags', function(req, res) {
	var idx = req.params.idx;
	db.favorite.find({where: {id: idx}}).then(function(favorite) {
		var favId = favorite.id;
		res.render('movies/tags', {favorite: favorite});
		// db.comment.findAll({where: {favoriteId: favId}}).then(function(tag) {
		// 	res.render('movies/tags', {tag: tag, favorite: favorite});
		// });
	});
});

module.exports = router;