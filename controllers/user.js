//Import Bcrypt package: to hash password, use salt.
const bcrypt = require('bcrypt');
//Import JsonWebToken package: to assign a token to a user when they log in.
const jwt = require('jsonwebtoken');
//Import Maskdata package: to mask various kind of data.
const MaskData = require('maskdata');
//Import CryptoJS package: to encrypt mail adress.
const cryptojs = require('crypto-js');
//Import the user's model, create by mongoose.
const User = require('../models/User');


//Middleware to create a new user account.
exports.signup = (req, res, next) => {
  //Calculates a Hash-based Message Authentication Code (HMAC) using the Secure Hash Algorithm function (SHA256).
  const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
  //Mask mail adress.
  const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: cryptedEmail,
        emailmasked: maskedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Function to hash mail adress.
const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

//Middleware to connect a user account that already exist in the DB.
exports.login = (req, res, next) => {
  //Calculates a Hash-based Message Authentication Code (HMAC) using the Secure Hash Algorithm function (SHA256).
  const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
  User.findOne({ email: cryptedEmail })
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
            token: jwt.sign(          // encode a new token 
              { userId: user._id },
              process.env.TK_JWT,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};