'use strict';

var _ = require('lodash');
var OldRecipes = require('./oldRecipes.model');
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
  var connection = new Connection(dbConfig);
  connection.on('connect', function(err) {
      // If no error, then good to proceed.
      console.log("Connected");
      var Request = require('tedious').Request;
      
      var recipeSQL = 'select RR.RecipeId, RR.RecipeName, RR.Description, RI.ImageName from Recipes RR left outer join RecipeImages RI on RR.RecipeId = RI.RecipeId;';
      var request = new Request(recipeSQL, function(err) {
      if (err) {
          console.log(err);} 
      });
      var result = [];


      request.on('row', function(columns) {
        //console.log('RecipeId: ', columns[0].value);
        result.push({ 
            recipeId: columns[0].value,
            recipeName: columns[1].value,
            description: columns[2].value,
            imageUrl: columns[3].value
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

// Get a single oldRecipes
exports.show = function(req, res) {
  OldRecipes.findById(req.params.id, function (err, oldRecipes) {
    if(err) { return handleError(res, err); }
    if(!oldRecipes) { return res.status(404).send('Not Found'); }
    return res.json(oldRecipes);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}

function executeStatement() {
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    var request = new Request("select RecipeName, Description from Recipes;", function(err) {
    if (err) {
        console.log(err);} 
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
          if (column.value === null) {
            console.log('NULL');
          } else {
            result+= column.value + " ";
          }
        });
        console.log(result);
        result ="";
    });

    request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}