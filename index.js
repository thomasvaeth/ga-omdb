var express = require('express');
var app = express();
var db = require('./models');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/search', require('./controllers/movie-search'));

app.use('/search', require('./controllers/movie-information'));

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.post('/favorites', function(req, res) {
	var data = req.body.id.split(',');
	db.favorite.create({imdbId: data[0], title: data[1], year: data[2], poster: data[3]}).then(function(movie) {
		res.redirect('/search/' + movie.imdbId);
	});
});

app.get('/favorites', function(req, res) {
	res.render('movies/favorites')
});

app.listen(3000);

app.post('/links', function(req, res) {
	var data = req.body.url;
	db.link.create({url: data}).then(function(link) {
		var hash = hashids.encode(link.id);
		link.hash = hash;
		link.save().then(function() {
			res.redirect('/links/' + link.id);
		});
	});
});