'use strict';

var _ = require('lodash');
var Recipe = require('./recipe.model');
var imageService = require('../foodPics/foodPics.controller');
var fs = require('fs');
var request = require('request');
var azure = require('azure-storage');
//var imageServicePr = Promise.promisifyAll(require('../foodPics/foodPics.controller'));
//var q = require('Q');

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

	console.log(req.body);
	startWithImage(req, res);

};

// Updates an existing recipe in the DB.
exports.update = function(req, res) {

	console.log('updating ', req.body );

	if(req.body._id) { delete req.body._id; }
	Recipe.findById(req.params.id, function (err, recipe) {
		if (err) { return handleError(res, err); }

		if(!recipe) { return res.status(404).send('Not Found'); }

		var updated = _.merge(recipe, req.body);

		updated.instructions = req.body.instructions;
		updated.ingredients = req.body.ingredients;


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



//IMAGE STUFF
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  //   s4() + '-' + s4() + s4() + s4();
}


var saveImage = function(recipe, callback) {
  //request(largeImage).pipe(fs.createWriteStream('./img/large/demo.jpg'));

  var url = recipe.imageUrl;

  var lastBit = url.split('/').pop();
  var splitFile = lastBit.split('.');
  var fileName = guid();
  if (splitFile.length === 1) {
  	fileName += ".jpg";
  } else {
  	fileName += newArr[newArr.length -1];
  }

  var filePath = './server/api/foodpics/img/' + fileName;

  var ws = fs.createWriteStream(filePath);
  ws.on('error', function(err) { console.log(err); });

  request(url).pipe(ws);

  ws.on('finish', function() { console.log('hey finished'); callback(filePath, fileName); });
  


}

var deleteFile = function(fileName) {
	var path = './server/api/foodpics/img/' + fileName;
	console.log('TO DELETE', fileName);
  //fs.unlink(fileName);
}

function startWithImage(req, res) {
	var recipe = req.body;
	saveImage(recipe, function(path, fileName) {    
		console.log('PATH', path);
		console.log('FILENAME', fileName);

		try {
        // Query the entry
        var check = fs.lstatSync(path);

        // Is it a directory?
        if (check.isFile()) {
            // Yes it is
            var utils = require('util');
            var fileStats = utils.inspect(check);
            console.log(fileStats);

            var containerName = 'foodpics';
            var blobSvc = azure.createBlobService();
            blobSvc.createBlockBlobFromLocalFile(
            	containerName,
            	fileName,
            	path,
            	function(error, result, response){
            		if(error){
            			console.log("Couldn't upload file %s", fileName);
            			console.error(error);
            		} else {
            			console.log('File %s uploaded successfully', fileName);
            			deleteFile(path);
            			recipe.imageUrl = process.env.blobStorageEndpoint + fileName;


            			Recipe.create(recipe, function(err, rec) {
            				if(err) { return handleError(res, err); }
            				return res.status(201).json(rec);
            			});
            		}
            	});
        }
    }
    catch (e) {
        // ...
        console.log('Sad Panda, not existing and all ', e)
    }




    
})
}

