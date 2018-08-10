const db             = require('./app/config/db');
const express        = require('express'); //express listens for connections and manages routing 
const app            = express();
const cors = require('cors');
const bodyParser     = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport'); 
const authController = require('./app/controllers/auth'); 

//Configure Express 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); 

require('./app/routes/person')(app); 
require('./app/routes/user')(app); 
require('./app/routes/todo')(app); 


//Configure Mongoose and Connect to Database 
mongoose.connect(db.url, {useNewUrlParser: true});

console.log('is mongoose connected? 0 - disconnected 1 - connected 2 - connecting 3 - disconnected'); 
console.log(mongoose.connection.readyState);

//Start the server 
app.listen(process.env.PORT || 8080, function() {
    console.log('Express server is up and running!');
  });
  