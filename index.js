var express = require('express');
var app = express();

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/search', require('./controllers/movie-search'));
app.use('/search', require('./controllers/movie-information'));
app.use('/favorites', require('./controllers/movie-favorites'));

app.use('/', require('./controllers/movie-comments'));

app.use('/', require('./controllers/movie-tags'));

app.listen(process.env.PORT || 3000);