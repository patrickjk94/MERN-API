const db             = require('./app/config/db');
const express        = require('express'); //express listens for connections and manages routing 
const app            = express();
var cors = require('cors');
const bodyParser     = require('body-parser')
const mongoose = require('mongoose');
var passport = require('passport'); 
var authController = require('./app/controllers/auth'); 

//Configure Express 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); 

//Set up routes 
var persons = require('./app/routes/person')
var users = require('./app/routes/user'); 
app.use('/', persons)
app.use('/', users); 

//Configure Mongoose and Connect to Database 
mongoose.connect(db.url, {useNewUrlParser: true});

app.listen(8000); 