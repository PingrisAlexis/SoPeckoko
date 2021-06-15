//Import Express (Node JS Framework)
const express = require('express');
//Import Mongoose package: To manage and use Mongo Database
const mongoose = require('mongoose');
//Import Body Parser: To extract the Json object from the POST request.
const bodyParser = require('body-parser');
//Import Helmet package: To secure Express apps by setting various HTTP headers.
const helmet = require("helmet");
//Import Patch: To work with file and directory paths.
const path = require('path');
//Import Dot env package: To mask connections informations.
require('dotenv').config();
//Create Express application.
const app = express();

//Connected to MongoDB with the files .env, that contains the URI.
mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to the database !'))
  .catch((error) => console.log(error));

//Cross Origin Resource Sharing Management
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Transform the data from POST method to JSon
app.use(bodyParser.json());
//HTTP headers protection
app.use(helmet());

//Import sauces routes.
const saucesRoutes = require('./routes/sauces');
//Import user routes.
const userRoutes = require('./routes/user');

//To load files that are in the images directory.
app.use('/images', express.static(path.join(__dirname, 'images')));
//Serve the route for sauces.
app.use('/api/sauces', saucesRoutes);
//Serve the route for user.
app.use('/api/auth', userRoutes);

module.exports = app;