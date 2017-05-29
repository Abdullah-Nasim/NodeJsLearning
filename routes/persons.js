
var mongojs = require('mongojs');
var db = mongojs('Abdullah:1234@ds155651.mlab.com:55651/personsdb', ['persons']);

module.exports = (app) => {

	app.get('/', function(req, res){
		db.persons.find(function(err, docs){

			res.json(docs);

		});
	});

	app.post('/person/find', function(req, res){

		var resp = res;
		var reqd = req;

		req.checkBody('name', 'Name is Required').notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.json(errors);
		}else{
			db.persons.find({name: reqd.body.name}, function(err, docs){

				resp.json(docs);

			});
		}


	});

	app.post('/person/add', function(req, res){

		var resp = res;

		req.checkBody('name', 'Name is Required').notEmpty();
		req.checkBody('age', 'Age is Required').notEmpty();

		var errors = req.validationErrors();

		if(errors){
				res.json(errors);
		}else{

			var newPerson = {
				name: req.body.name,
				age: req.body.age
			}

			db.persons.insert(newPerson, function(err, res){
				if(err){
					console.log(err);
				}else{
					resp.send('Success')
				}

			});
		}

	});

	app.delete('/person/delete/:id?', function(req, res){
		console.log(req.query.id);
		res.send('Success');

	});
	
}