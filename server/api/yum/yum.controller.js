'use strict';

var _ = require('lodash');
var Recipe = require('../recipe/recipe.model');
var http = require("http");
var config = require('../../config/local.env');
var request = require('request');
var cheerio = require('cheerio');



var hostName = "http://api.yummly.com/v1/api/";
var yumEndpoint = "/v1/api/"
var appId = config.yummlyAppId;
var appKey = config.yummlyAppKey;
var authUrl = "?_app_id=" + appId + "&_app_key=" + appKey;
var searchOut = hostName + "recipes" + authUrl + "&maxResult=10&q=";

//FormattedUrl = String.Format("recipes?_app_id={0}&_app_key={1}&q={2}", ApiId, AppKey, Query);

// Get list of things
exports.index = function(req, res) {  
	

	
};

exports.nextPage = function(req, res) {
	var search = req.params.search;
	var page = req.params.page * 10;
	var replaced = search.split(' ').join('+');
	var totes = searchOut + replaced + "&start=" + page;

	var request = http.request(totes, function(response){
		var body = "";
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', function() {
			res.send(JSON.parse(body));
		});
	});

	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});

	request.end();

}



// Get a single recipe
exports.show = function(req, res) {
	var search = req.params.recipeId;
	var finalUrl = hostName + "recipe/" + search + authUrl;	
	console.log(finalUrl);

	var request = http.request(finalUrl, function(response){
		
		var body = "";
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', function() {
			res.send(JSON.parse(body));
		});
	});

	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});

	request.end();

};



exports.getInstructions = function(req, res) {
	var recipeId = req.params.recipeId;
	//var url = req.params.url;
	var recipe = {};

	Recipe.findById(recipeId, function (err, rec) {
		if(err) { return handleError(res, err); }
		if(!rec) { return res.status(404).send('Not Found'); }
		
		request(rec.sourceUrl, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
			    
			    var $ = cheerio.load(body);
			    
			    if(rec.sourceUrl.indexOf('marthastewart') > -1) {
			    	var ins = $('div .col2 p').contents();
			    	
			    	var directions = [];

			    	for(var y = 0; y < ins.length; y++) {
			    		var cleanedIns = ins[y].data.trim();
			    		if(cleanedIns.length > 2) {
			    			directions.push({id: y + 1, instruction: cleanedIns})
			    		}			    		
			    	}

			    	Recipe.findOne({ _id: recipeId }, function (err, doc){
						doc.instructions = directions;
						doc.save();						
					});

			    }

			    if(rec.sourceUrl.indexOf('myrecipes.com') > -1) {
			    	var ins = $('div .field-instructions p').contents();
			    	
			    	var directions = [];

			    	for(var y = 0; y < ins.length; y++) {
			    		var cleanedIns = ins[y].data.trim();
			    		if(cleanedIns.length > 2) {
			    			console.log(cleanedIns)
			    			directions.push({id: y + 1, instruction: cleanedIns})
			    		}			    		
			    	}

			    	Recipe.findOne({ _id: recipeId }, function (err, doc){
						doc.instructions = directions;
						doc.save();						
					});


			    	//field-instructions
			    }



			}
		});
		



	});


	

};

function updateThatDarnRecipe() {

}

function handleError(res, err) {
  //return res.status(500).send(err);
}