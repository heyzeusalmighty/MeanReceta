'use strict';

var express = require('express');
var controller = require('./recipe.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

//FOR REALS
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

// //FOR TESTING
// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/',  controller.create);
// router.put('/:id',  controller.update);
// router.patch('/:id',  controller.update);
// router.delete('/:id',  controller.destroy);

module.exports = router;