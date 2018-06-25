// routes/index.js
const noteRoutes = require('./note_routes');
const userRoutes = require('./user_routes'); 
// const expenseRoutes = require('./expense_routes'); 

module.exports = function(app, db) {
  noteRoutes(app, db);
  userRoutes(app, db); 
  // expenseRoutes(app, db); 
  // Other route groups could go here, in the future
};