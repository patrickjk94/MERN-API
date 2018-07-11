// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: false
  },
  password: {
    type: String,
    required: false
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Check if password is the same 
  if (!user.isModified('password')) return callback();

  // Hash new password 
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, callback) {
  console.log("user.verifyPassword is being called!"); 
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    console.log("isMatch: " + isMatch); 
    console.log("password: " + password); 
    console.log("this.password: " + this.password); 
    callback(null, isMatch);
  });
}; 

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
