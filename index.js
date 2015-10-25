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

app.post('/favorites', function(req, res) {
	var data = req.body.id.split(',');
	db.favorite.create({imdbId: data[0], title: data[1], year: data[2], poster: data[3]}).then(function(movie) {
		res.redirect('/search/' + movie.imdbId);
	});
});

app.get('/favorites', function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render('movies/favorites', {favorites: favorites});
	});
});

app.listen(3000);