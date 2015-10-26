var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/:idx/comments', function(req, res) {
	var idx = req.params.idx;
	var authorName = req.body.author;
	var commentText = req.body.comment;
	db.comment.create({author: authorName, comment: commentText, favoriteId: idx}).then(function(comment) {
		res.redirect('/favorites/' + idx +'/comments')
	})
});

router.get('/:idx/comments', function(req, res) {
	var idx = req.params.idx;
	db.favorite.find({where: {id: idx}}).then(function(favorite) {
		var favId = favorite.id;
		db.comment.findAll({where: {favoriteId: favId}}).then(function(comment) {
			res.render('movies/comments', {comment: comment, favorite: favorite});
		});
	});
});

module.exports = router;