var express = require('express');
var app = express();
var pg = require("pg");
var config = require('./config');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.render('pages/pablo.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


pg.defaults.ssl = true;

pg.connect(config.DATABASE_URL, function (err, client, done) {
  if (err)
    throw err;
	
    client.query('CREATE TABLE IF NOT EXISTS' +
    ' prueba(id SERIAL PRIMARY KEY,' +
    ' nombre VARCHAR(30),' +
    ' apellido VARCHAR(30))', function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      }
    });

  });
  
  
app.post('/user', function(req, res) {
  
  
	pg.connect(config.DATABASE_URL, function (err, client, done) {
		if (err)
		throw err;
		
		var name = "Pablo";
		var surname = "Federico";
		
		var user = [name,surname];
		
		client.query('INSERT INTO prueba(nombre,apellido) values($1,$2)', user, function (err, result) {
			if (err) {
			console.log(err);
			throw err;
			}
		});

	});
	
	
	/*
	res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify({
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null
    }));

    //debugging output for the terminal
    console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
	*/

});
