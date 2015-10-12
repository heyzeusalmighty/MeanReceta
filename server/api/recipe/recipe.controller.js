'use strict';

var _ = require('lodash');
var Recipe = require('./recipe.model');

// Get list of recipes
exports.index = function(req, res) {
  Recipe.find(function (err, recipes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(recipes);
  });
};

// Get a single recipe
exports.show = function(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if(err) { return handleError(res, err); }
    if(!recipe) { return res.status(404).send('Not Found'); }
    return res.json(recipe);
  });
};

// Creates a new recipe in the DB.
exports.create = function(req, res) {
  Recipe.create(req.body, function(err, recipe) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(recipe);
  });
};

// Updates an existing recipe in the DB.
exports.update = function(req, res) {
  console.info('udpateing: ' + req);
  if(req.body._id) { delete req.body._id; }
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) { return handleError(res, err); }
    if(!recipe) { return res.status(404).send('Not Found'); }
    var updated = _.merge(recipe, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recipe);
    });
  });
};

// Deletes a recipe from the DB.
exports.destroy = function(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if(err) { return handleError(res, err); }
    if(!recipe) { return res.status(404).send('Not Found'); }
    recipe.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}