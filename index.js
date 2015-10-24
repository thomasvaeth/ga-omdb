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

app.listen(3000);