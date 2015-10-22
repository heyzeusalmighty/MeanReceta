'use strict';

var express = require('express');
var controller = require('./yum.controller');

var router = express.Router();

//router.get('/:search', controller.index);
router.get('/:search/:page', controller.nextPage);
router.get('/:recipeId', controller.show);
router.post('/:recipeId', controller.getInstructions);


module.exports = router;