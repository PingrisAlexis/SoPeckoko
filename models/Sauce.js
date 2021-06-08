//Import Mongoose package: schema-based solution to model your application data.
const mongoose = require('mongoose');

//Schema of the sauces.
const sauceSchema = mongoose.Schema({
  //User Id of the sauce's post creator
  userId: {
    type: String,
    required: true
  },
  //Name of the sauce
  name: {
    type: String,
    required: true
  },
  //Creator of the sauce
  manufacturer: {
    type: String,
    required: true
  },
  //Description of the sauce
  description: {
    type: String,
    required: true
  },
  //Ingredients of the sauce
  mainPepper: {
    type: String,
    required: true
  },
  //Picture's address of the sauce
  imageUrl: {
    type: String,
    required: true
  },
  //Power of the sauce
  heat: {
    type: Number,
    required: true
  },
  //Likes of the sauce
  likes: {
    type: Number,
    required: false
  },
  //Dislikes of the sauce
  dislikes: {
    type: Number,
    required: false
  },
  //User's whose likes the sauce
  usersLiked: {
    type: Array,
    required: false
  },
  //Users whose dislikes the sauces
  usersDisliked: {
    type: Array,
    required: false
  },
});

module.exports = mongoose.model('Sauce', sauceSchema);