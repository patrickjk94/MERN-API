var User = require('../models/User');
var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

var bcrypt = require('bcrypt-nodejs');


module.exports = function(app) {
    /**
     *  Add a new user to the databse 
     */
    app.post('/register', (req, res, next) => {
        console.log('/register'); 

        //1. create a new user object  
        var user = new User({
            username: req.body.username,
            email : req.body.email, 
            password: req.body.password
        });
        
        //2. make sure there is not a pre-existing user or password 
        let valid_user = true; 

        //3. if valid save the user to the database else send a bad response 
        if(valid_user) { 
            user.save(function(err) {
                console.log("saving!"); 
                if (err)
                    res.send(err);
                res.json({ status: 1, message: 'Added a new User!' });
            });
        } else {
            res.json({ status: 0, message: 'Not a valid User!'}); 
        }
    })

    /**
     * Retrieve all existing users users if the user has the correct authentication credentials 
     */
    app.route("/getUsers").get(authController.isAuthenticated, (req, res, next) => {
        console.log("Log: called getUsers"); 
        User.find(function(err, users) {
            if (err)
                res.send(err);
            console.log("get users: " + users); 
            res.json(users);
        });        
    });
}
// module.exports = router;