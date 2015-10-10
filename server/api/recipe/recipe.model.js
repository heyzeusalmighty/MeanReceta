'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  recipeName: String,
  description: String,
  ServingSize: String,
  ingredients: [{
	title : String,
	ingredients: [String]
  }],
  instructions: [{
  	id: Number,
  	instruction: String
  }],
  tags: [Number]

});

module.exports = mongoose.model('Recipe', RecipeSchema);