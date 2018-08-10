// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our todotask schema
var TodoSchema = new mongoose.Schema({
  user_id: 
  {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  }, 
  completed: {
    type: Boolean, 
    required: false
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Todo', TodoSchema);
