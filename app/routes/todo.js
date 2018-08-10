/** Routes for my todolist */
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken'); 
const { verifyToken } = require('../util.js'); 

var Todo = require('../models/Todo');

module.exports = function(app) {

  /**
   * Add a todo item to the database 
   */
  app.post('/addTodo', verifyToken, function(req, res)  {
    // Note in Postman make sure to use x-www-form-urlencoded not form-data
    console.log("/addTodo");

    //1. grab the user id 
    user_id = req.app.locals.user_id; 
 
    //2. create a new Todo item 
    m_todo = { user_id: user_id, text: "text", completed: false }; 
    var todo = new Todo(m_todo); 
    console.log("made todo: " + todo); 
        
    //3. save the todo item 
    todo.save(function(error) 
    {
      if(error)
      {
        console.log("error!"); 
      }
      else
      {
        console.log("saved!"); 
        res.send( {success: true} ); 
      }
    });
  });  

  /**
   * Get all the todos 
   */
  app.get('/getAllTodos', verifyToken, function(req, res)
  {  
    console.log("/getAllTodos"); 
    Todo.find(function (err, todos)
    {
      if (err) 
        return console.error(err);
      else 
        res.send(todos); 
    }); 
  }); 

  /**
   * Remove a todo from the database by id 
   */
  app.delete('/removeTodo/:id', verifyToken, function(req, res) {
    const m_id = req.params.id;
    console.log("removeTodo"); 

    Todo.findOneAndRemove({ _id: m_id }) 
    .exec(function(err, item) {
        if (err) {
            return res.json({success: false, msg: 'Cannot remove item'});
        }       
        if (!item) {
            return res.status(404).json({success: false, msg: 'Todo not found'});
        }  
        res.json({success: true, msg: 'Todo deleted.'});
    });

  });
}