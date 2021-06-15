//Import Sauce schema.
const Sauce = require('../models/Sauce');
//Import package File System: To manage download and upload images.
const fs = require('fs');

//Creation of a sauce.
exports.createOneSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'The sauce has been registered !' }))
    .catch(error => res.status(400).json({ error }));
};

//Recovery of a single sauce through ID.
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modification of a sauce.
exports.modifyOneSauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'The sauce has been modified !' }))
    .catch(error => res.status(400).json({ error }));
};

// Deleting a sauce.
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'The sauce has been deleted !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Retrieving the list of sauces.
exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Like or Dislike one sauce.
exports.likeDislikeSauce = (req, res, next) => {
  const like = new Sauce({
    likes: req.body.like,
    userId: req.body.userId
  });
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      Sauce.updateOne({ _id: req.params.id }, sauce)
      //If user want to like.
      if (like.likes == 1) {
        let Disliked = sauce.usersDisliked.indexOf(like.userId);
        if (Disliked > -1) {
          sauce.usersDisliked.splice(Liked, 1);
          sauce.dislikes = sauce.dislikes - 1;
        }
        sauce.likes = sauce.likes + 1;
        sauce.usersLiked.push(like.userId);
        //If user want to not like or dislike anymore.
      } else if (like.likes == 0) {
        let Liked = sauce.usersLiked.indexOf(like.userId);
        if (Liked > -1) {
          sauce.usersLiked.splice(Liked, 1);
          sauce.likes = sauce.likes - 1;
        }
        let Disliked = sauce.usersDisliked.indexOf(like.userId);
        if (Disliked > -1) {
          sauce.usersDisliked.splice(Liked, 1);
          sauce.dislikes = sauce.dislikes - 1;
        }
        //If user want to dislike.
      } else if (like.likes == -1) {
        sauce.dislikes = sauce.dislikes + 1;
        sauce.usersDisliked.push(like.userId);
      }
      sauce.save(sauce)
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};