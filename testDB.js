// var db = require('./models');

// // db.favorite.create({
// // 	imdbId: 'tt3659388',
// // 	title: 'The Martian',
// // 	year: 2015,
// // 	poster: 'http://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg'
// // }).then(function(movie) {
// // 	console.log(movie.get());
// // });

// // db.favorite.find({where: {id: 1}}).then(function(movie) {
// // 	console.log(movie.title);
// // });

// db.favorite.find({where: {imdbId: 'tv1234567'}}).then(function(movie) {
// 	if (movie !== null) {
// 		movie.destroy().then(function() {
// 			console.log('Destroyed');
// 		});
// 	} else {
// 		console.log('Created');
// 	}
// });

// db.favorite.findOne().then(function(favorite) {
// 	favorite.createComment({
// 		comment: 'This movie is great!',
// 		author: 'Chyi Wang'
// 	}).then(function(comment) {
// 		console.log(comment.get());
// 	});
// });