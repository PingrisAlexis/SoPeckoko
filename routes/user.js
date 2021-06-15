//Import Express: Use express router.
const express = require('express');
//Call of the express router with the method.
const router = express.Router();

//Import users controllers. Functions are associated with the different routes.
const userCtrl = require('../controllers/user');
//Import password rules. Functions are associated with the different routes.
const passwordValidation = require('../middleware/password');

//Route to create user.
//Encrypts the user's password of the user, adds the user to the database.
router.post('/signup', passwordValidation, userCtrl.signup);
//Route to login user.
//Checks the identification identification information user's credentials, by returning the userID from the database and a signed signed JSON token.
router.post('/login', userCtrl.login);

module.exports = router;