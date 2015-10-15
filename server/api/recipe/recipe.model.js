'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  recipeName: String,
  description: String,
  servingSize: String,
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

module.exports = mongoose.model('Recipe', RecipeSchema);