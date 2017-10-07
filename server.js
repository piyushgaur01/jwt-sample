// =======================
// get the packages we need
// =======================
var express = require('express');
var app = new express();
var apiRoutes = require('./app/routes/APIRoutes');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var config = require('./config');
var User = require('./app/models/user');

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080;
var promise = mongoose.connect(config.database, { useMongoClient: true }); // connect to database
promise.then(function (db) {
    console.log('connected to db successfully');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// routes
// =======================

// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//Create a sample user
app.get('/setup', function(req, res) {
    
      // create a sample user
      var piyush = new User({ 
        name: 'piyush_gaur', 
        password: 'password',
        admin: true 
      });
    
      // save the sample user
      var saveUser = piyush.save();
      saveUser.then(function(result){
          console.log('user saved successfully!');
          console.log(result);
          res.json({ success: true });
      }, function(err){
          console.log(err);
      });
    });

// =======================
// Start the server
// =======================
app.listen(port);
console.log('Server is running at http://localhost:' + port);