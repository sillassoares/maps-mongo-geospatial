var express = require('express'),
mongoClient = require('mongodb').MongoClient,
app = express(),
db;

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));



app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/positions/:locations', function (req, res) {

	var locations = JSON.parse(req.params.locations);

	mongoClient.connect('mongodb://localhost:27017/map_positions', function (err, db) {
		if (!err) {
			var positions = db.collection('positions');
			positions.find({ location: { $geoWithin: { $box: locations } } }).toArray(function (err, items) {
				console.log(items.length);
				res.send(items);
			});
		}
	});
});

var serve = app.listen(3000, function () {
	console.log('Server running localhost:3000');
})