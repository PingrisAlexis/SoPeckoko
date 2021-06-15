//Import the password schema.
const passwordSchema = require('../models/Password');

//Verification that the password validates the schema.
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(400, 'Password required: Minimum length 8, must have 1 uppercase and 1 lowercase letter, at least 2 digits, and should not have spaces.');
    res.end('Incorrect password format');
  } else {
    next();
  }
}
