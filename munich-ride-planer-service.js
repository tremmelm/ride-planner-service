var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

app.use(express.static('public'));

//from rideplanner db
app.get('/getSchedule', (req, res) => {
	
});

//update rideplanner db
app.put('/updateSchedule', (req, res) => {
   res.send('test');
});

//delete
//app.delete('/user', (req, res) => {
//});


app.get('/getConfigFromDb', (req, res) => {
	var dbName = "rideplanner";
	var dbConnetionString = `mongodb://localhost:27017/${dbName}`;
	MongoClient.connect(dbConnetionString, function(err, db) {
		var employees = db.collection('employees').find();
		
		db.close();
		res.send(employees);
	});
	
	res.send('test');
});

var server = app.listen(8081, () => {
   var host = server.address().address
   var port = server.address().port
   console.log("application is listening at http://%s:%s", host, port)
});


var getEmployeesFromDb = (db, callback) => {
  var collection = db.collection('employees');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
  });
}

/*app.get('/getConfig', (req, res) => {
   var configFilePath = "./config.json"
   fs.readFile(configFilePath, (error, content) => {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});
});*/