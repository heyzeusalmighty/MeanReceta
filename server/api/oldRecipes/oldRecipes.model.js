'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OldRecipesSchema = new Schema({
  recipeName: String,
  description: String,
  servingSize: String,
  source: String,
  sourceUrl: String,
  imageUrl: String,
  yummlyId: String,
  ingredients: [{
  	title : String,
  	ingredients: [String]
    }],
  instructions: [{
  	id: Number,
  	instruction: String
  }],
  tags: [String]

});

module.exports = mongoose.model('OldRecipes', OldRecipesSchema);