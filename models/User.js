//Import Mongoose: Define schemas with strongly typed data
const mongoose = require('mongoose');

//Import Mongoose unique validator: Adds pre-save validation for unique fields within a Mongoose schema
const uniqueValidator = require('mongoose-unique-validator');

//Define user's schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true
  },
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);