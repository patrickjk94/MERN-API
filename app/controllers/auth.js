// Load required packages
var passport = require('passport'); 
var BasicStrategy = require('passport-http').BasicStrategy; 
var User = require('../models/User'); 

passport.use(new BasicStrategy(
    function(username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return callback(err); }
    
          // No user found with that username
          if (!user) { return callback(null, false); }
    
          // Make sure the password is correct
          user.verifyPassword(password, function(err, isMatch) {
            if (err) { return callback(err); }
    
            // Password did not match
            if (!isMatch) { 
                console.log("passwords did not match"); 
                return callback(null, false); 
            }
    
            // Success
            return callback(null, user);
          });
        });
    }
)); 

//Tells passport to authenticate using our Basic Strategy. 
// {session:false} tells passport to not store session variables btw calls so user has to submit username and pass on each call 
exports.isAuthenticated = passport.authenticate('basic', { session : false }); 

