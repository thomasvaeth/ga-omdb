var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/favorites/:idx/comments', function(req, res) {
	var idx = req.params.idx;
	var authorName = req.body.author;
	var commentText = req.body.comment;
	db.comment.create({author: authorName, comment: commentText, favoriteId: idx}).then(function(comment) {
		res.redirect('/favorites/' + idx +'/comments')
	});
});

router.get('/favorites/:idx/comments', function(req, res) {
	var idx = req.params.idx;
	db.favorite.find({where: {id: idx}}).then(function(favorite) {
		db.comment.findAll({where: {favoriteId: idx}}).then(function(comments) {
			res.render('movies/comments', {comments: comments, favorite: favorite});
		});
	});
});

router.post('/favorites/:favoriteId/comments/:idx', function(req, res) {
	var idx = req.params.idx;
	var authorName = req.body.author;
	var commentText = req.body.comment;
	db.comment.find({where: {id: idx}}).then(function(comment) {
		comment.update({author: authorName, comment: commentText}).then(function() {
			res.redirect('/favorites/' + req.params.favoriteId + '/comments');
		});
	});
})

module.exports = router;