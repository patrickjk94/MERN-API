// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our todotask schema
var TodoTaskSchema = new mongoose.Schema({
  username: 
  {
    type: String,
    unique: true,
    required: false
  },
  text: {
    type: String,
    required: false
  }, 
});

// Export the Mongoose model
module.exports = mongoose.model('TodoTask', TodoTaskSchema);
