//define requirements
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app= express();

//connect to MongoDb
mongoose.connect('mongodb://localhost/artistgo');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//init routes
app.use('/api', require('./routes/api'));

//error handling mid ware

app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});

//listen for request
app.listen(process.env.port || 4000, function(){
  console.log('now listening on port 4000')
});
