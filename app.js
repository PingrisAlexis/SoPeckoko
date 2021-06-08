const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require("helmet");            //It helps you secure your Express apps by setting various HTTP headers. 
const path = require('path');

const app = express();


//HTTP headers protection
app.use(helmet());


mongoose.connect('mongodb+srv://69BlaSh:Tc74rL1Cjdzb0Px2@cluster0.p436p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
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


app.use(bodyParser.json());



const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;