var express = require('express');
var router = express.Router();

var Person = require('../models/Person');

//POST route for updating data

module.exports = function(app) {
  /**
   * Add a person to the database 
   */
  app.post('/addPerson', function(req, res)  {
    // Note in Postman make sure to use x-www-form-urlencoded not form-data
    console.log("/addPerson"); 

    console.log(req.body); 
    //create a new Person 
    var person = new Person(req.body); 
    console.log("made person: " + person); 

    //save all person
    person.save(function(error) {
      console.log("saved!"); 
      if(error) {
        console.log("error!"); 
      } else {
        res.send(person);
      }
    }); 
  });  

  /**
   * Get all the persons 
   */
  app.get('/getAllPersons', function(req, res) {  
    console.log("/getAllPersons"); 
    Person.find(function (err, persons) {
      if (err) return console.error(err);
      console.log(persons);
      res.send(persons); 
    }); 
  }); 

  /**
   * Remove a person from the database by id 
   */
  app.delete('/removePerson/:id', function(req, res) {
    const m_id = req.params.id;
    console.log("removePerson"); 

    Person.findOneAndRemove({ _id: m_id }) 
    .exec(function(err, item) {
        if (err) {
            return res.json({success: false, msg: 'Cannot remove item'});
        }       
        if (!item) {
            return res.status(404).json({success: false, msg: 'Person not found'});
        }  
        res.json({success: true, msg: 'Person deleted.'});
    });
  });
}
// module.exports = router;