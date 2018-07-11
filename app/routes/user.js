var User = require('../models/User');
var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

var bcrypt = require('bcrypt-nodejs');


router.post('/addUser', (req, res, next) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password
        });
    
    user.save(function(err) {
        console.log("saving!"); 
        if (err)
            res.send(err);
        res.json({ message: 'Added a new User!' });
        });
});

router.route("/getUsers").get(authController.isAuthenticated, (req, res, next) => {
    console.log("Log: called getUsers"); 
    User.find(function(err, users) {
        if (err)
            res.send(err);
        console.log("get users: " + users); 
        res.json(users);
    });        
});

module.exports = router; 