const express = require('express');
const controller = require('../controllers/position');

const router = express.Router();
const passport = require('passport');

router.get('/:categoryID', passport.authenticate('jwt', { session: false }), controller.getByCategoryID);

router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = router;
