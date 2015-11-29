'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OldRecipesSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,

//real things
  imageUrl: String
});

module.exports = mongoose.model('OldRecipes', OldRecipesSchema);