//Import Password Validator package.
var passwordValidator = require('password-validator');

//Schema password more secure.
var passwordSchema = new passwordValidator();

//Password schema rules.
passwordSchema
  .is().min(8)                                     // Minimum length 8
  .has().uppercase(1)                              // Must have 1 uppercase letters
  .has().lowercase(1)                              // Must have 1 lowercase letters
  .has().digits(2)                                 // Must have at least 2 digits
  .has().not().spaces()                            // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']);  // Blacklist these values

module.exports = passwordSchema;
