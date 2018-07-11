var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  fname: String,
  lname: String,
});

module.exports = mongoose.model('Person', PersonSchema);