const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

// Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB Connection
const db = require('./model/index');
db.sequelize.sync({ force: false }); // Use force: true only during development to reset tables

// Setting up the View Engine
app.set('view engine', 'ejs');
app.set('views', 'view');

//public folder to store static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


// Calling the routers
const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');
const authRouter = require('./routes/auth')


app.use(indexRouter);
app.use(studentRouter);
app.use(authRouter);

// Start the server
app.listen(port, () => {
  console.log(`My Web App listening on port http://localhost:${port}/home`);
});
