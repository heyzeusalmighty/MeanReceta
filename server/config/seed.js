/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Recipe = require('../api/recipe/recipe.model');
var Tag = require('../api/tag/tag.model');




User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'notAdmin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Recipe.find({}).remove(function() {
//   Recipe.create({
//     recipeName: 'Test Recipe 1',
//     description: 'This is a desc',
//     servingSize: '12',
//     instructions: [{ id: 1, instruction: 'do all the things first'}, { id: 2, instruction: 'now all the other things'}],
//     ingredients: [{ title: 'first things', ingredients: ['1/2 oz kale', 'some bourbon', 'prob salt']},
//                   { title: 'the rest', ingredients: ['18 chickens and their eggs', 'prob more salt']}]
//   });
// });

// Tag.find({}).remove(function() {
//   Tag.create(
//     { tagName: 'Christmas', active: true },
//     { tagName: 'Turkish', active: true },
//     { tagName: 'Arbor Day', active: true})
// });
