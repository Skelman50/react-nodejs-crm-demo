const express = require('express');
const passport = require('passport');
const controller = require('../controllers/category');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getID);

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

router.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update);

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.create);


module.exports = router;
