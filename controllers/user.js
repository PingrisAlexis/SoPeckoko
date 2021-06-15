//Import Bcrypt package: to hash password, use salt.
const bcrypt = require('bcrypt');
//Import JsonWebToken package: to assign a token to a user when they log in.
const jwt = require('jsonwebtoken');
//Import Maskdata package: to hash mail adress.
const MaskData = require('maskdata');
//Import the user's model, create by mongoose.
const User = require('../models/User');

//Middleware to create a new user account.
exports.signup = (req, res, next) => {
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
  if (mediumRegex.test(req.body.password) == false) {
    res.status(400).json({ error })
  } else {
    const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          emailmasked: maskedEmail,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};
//Function to hash mail adress.
const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

//Middleware to connect a user account.
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};