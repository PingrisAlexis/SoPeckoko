//Import Express: Use express router.
const express = require('express');
//Call of the express router with the method.
const router = express.Router();
//Import Auth: Get the JsonWebToken authentication configuration.
const auth = require('../middleware/auth');
//Import Multer: Manage images.
const multer = require('../middleware/multer-config');
//Import sauces controllers. Functions are associated with the different routes.
const saucesCtrl = require('../controllers/sauce');


//Route to create a sauce: Captures and records the image, analyses the sauce using a string and saves it in the database, by defining correctly its URL image.
router.post('/', auth, multer, saucesCtrl.createOneSauce);
//Route to update a sauce: Updates the sauce with the provided ID.
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce);
//Route to delete a sauce: Delete the sauce with the provided ID.
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
//Route to get all sauce: Returns array of all sauces in te data base.
router.get('/', auth, saucesCtrl.getAllSauce);
//Route to get one sauce: Returns the sauce with the ID provided.
router.get('/:id', auth, saucesCtrl.getOneSauce);
//Route to like or dislike a sauce.
router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);

module.exports = router;