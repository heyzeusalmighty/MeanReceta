'use strict';

var _ = require('lodash');
var OldRecipes = require('./oldRecipes.model');
var NewRecipe = require('../recipe/recipe.model');
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;
var config = require('../../config/local.env');
var dbConfig = {
	userName: config.oldDatabaseUserName,
	password: config.oldDatabasePassword,
	server: config.oldDatabaseServer,
    // When you connect to Azure SQL Database, you need these next options.
    options: {
    	encrypt: true, 
    	database: 'GameQueue',
      //useColumnNames: true
  }
};


// Get list of oldRecipess
exports.index = function(req, res) {
	getAllTheOldRecipes(res);	
};


// Creates a new recipe in the DB.
exports.create = function(req, res) {
  Recipe.create(req.body, function(err, recipe) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(recipe);
  });
};


// Get a single oldRecipes
exports.transfer = function(req, res) {

	var oldRecipe = req.body;
	console.log(oldRecipe.tags);
	
	transferThatOneRecipe(oldRecipe, res);
	
};


function handleError(res, err) {
	return res.status(500).send(err);
}

function getAllTheOldRecipes(res) {
	var connection = new Connection(dbConfig);
	connection.on('connect', function(err) {
      // If no error, then good to proceed.
		console.log("Connected");
		var Request = require('tedious').Request;

		var recipeSQL = 'select RR.RecipeId, RR.RecipeName, RR.Description, RI.ImageName from Recipes RR left outer join RecipeImages RI on RR.RecipeId = RI.RecipeId;';

		var recipeTagsSql = 'Select Main.RecipeID, Main.RecipeName, Main.Description, Main.ImageName, Main.Instructions, ' +
			'Main.ServingSize, Left(Main.Tags, Len(Main.Tags)-1) as "Tags" '+
			'From (select distinct RR1.RecipeID, RR1.RecipeName, RR1.Description, RI.ImageName, RR1.Instructions, ' +
			'RR1.ServingSize, (Select TT1.TagName + \',\' AS [text()] from Tags TT1 ' +
			'inner join RecipeTags RT on TT1.TagId = RT.TagId inner join Recipes RR2 on RT.RecipeID = RR2.RecipeID ' +
			'Where RR1.RecipeID = RR2.RecipeID For XML PATH (\'\')) [Tags] From Recipes RR1 '+
			'left outer join RecipeImages RI on RR1.RecipeId = RI.RecipeId)[MAIN];';

		var request = new Request(recipeTagsSql, function(err) {
			if (err) {console.log(err);} 
		});
		
		var result = [];


		request.on('row', function(columns) {
			//console.log('RecipeId: ', columns[0].value);
			result.push({ 
				recipeId: columns[0].value,
				recipeName: columns[1].value,
				description: columns[2].value,
				imageUrl: columns[3].value,
				instructions: columns[4].value,
				servingSize: columns[5].value,
				tags: columns[6].value,
			});

		});


		//doneInProc 
		request.on('doneInProc', function(rowCount, more) {
			console.log(rowCount + ' rows returned -- doneInProc');
			return res.status(200).json(result);
		});



		connection.execSql(request);
	});
};



function transferThatOneRecipe(oldRecipe, res) {
	var connection = new Connection(dbConfig);
	connection.on('connect', function(err) {
      // If no error, then good to proceed.
		console.log("Connected");
		var Request = require('tedious').Request;

		var recipeSQL = 'select IG.Title, IL.Ingredient from IngredientGroups IG ' +
						'inner join IngredientLines IL on IG.IngredientGroupID = IL.IngredientGroupID ' +
						'where IG.RecipeID = @oldId;';



		

		var request = new Request(recipeSQL, function(err) {
			if (err) {console.log(err);} 
		});
		
		request.addParameter('oldId', TYPES.Int, oldRecipe.recipeId);

		var result = [];


		request.on('row', function(columns) {
			//console.log('RecipeId: ', columns[0].value);
			result.push({ 
				title: columns[0].value,
				ingredient: columns[1].value				
			});

		});


		//doneInProc 
		request.on('doneInProc', function(rowCount, more) {
			
			var finalIngs = [];
			var currentTitle = '';
			
			for (var i = 0; i < result.length; i++) {
				var idx = -1;
				for (var x = 0; x < finalIngs.length; x++) {
					if (result[i].title == finalIngs[x].title) {
						idx = x;
					}
				}

				if (idx < 0) {					
					finalIngs.push({title: result[i].title, ingredients: [result[i].ingredient]});
				} else {
					finalIngs[idx].ingredients.push(result[i].ingredient);
				}
			}

			var cleaned = oldRecipe.instructions.replace('<ol>', '');
			cleaned = cleaned.replace('</ol>', '');
			cleaned = cleaned.replace('</li>', '');

			var inst = cleaned.split('<li>');
			var counter = 0;
			var newInst = inst.map(function(obj) {
			  return { id: counter++, instruction: obj}
			});

			var newRecipe = {
				recipeName: oldRecipe.recipeName,
				description: oldRecipe.description,
				servingSize: oldRecipe.servingSize,
				source: 'old stuff',
				imageUrl: oldRecipe.imageUrl,
				yummlyId: oldRecipe.recipeId,
				ingredients : finalIngs,
				instructions : newInst,
				tags: oldRecipe.tags.split(',')
			};


			NewRecipe.create(newRecipe, function(err, recipe) {
			    if(err) { return handleError(res, err); }
			    return res.status(201).json(recipe);
		    });
			
		});



		connection.execSql(request);
	});
};