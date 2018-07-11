// routes/index.js
const personRoutes = require('./person'); 
const userRoutes = require('./user'); 

module.exports = function(app) {
  personRoutes(app); 
  userRoutes(app); 
  // Other route groups could go here, in the future
};