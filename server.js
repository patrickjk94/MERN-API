// server.js
var cors = require('cors');

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./app/config/db');
const app            = express();
const port = 8000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err); 
                      
  // Make sure you add the database name and not the collection name
  const actual_db = database.db("expense-manager-pat"); 
  // require('./app/routes/note_routes')(app, actual_db); 
  require('./app/routes/index')(app, actual_db); 

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
