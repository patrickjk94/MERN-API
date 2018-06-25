var express = require('express');
var router = express.Router();
var User = require('../models/User');

module.exports = function(app, db) {

//CRUD 

//Create
  app.post('/addUser', (req, res) => {
    var user = new User();
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        db.collection('users').insert(user, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
          } else {
            console.log("added user :" + user); 
            res.send(result.ops[0]);
          }
        });
      });  

//Read
  app.get('/getAllUsers',function(req, res) {
    console.log("calling getAllUsers");         
    //TODO: Use Mongoose to access the collection. Note wasn't working earlier w/ mongoose. 
    db.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result); 
    });
  }); 
  
//Update 

//Delete
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
}