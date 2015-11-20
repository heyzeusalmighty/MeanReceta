(function() {

	'use strict';

	angular.module('recetaApp').controller('YummlyController', YummlyController);

	YummlyController.$inject= ['DataService', '$location','$routeParams', 'toastr'];

	function YummlyController(DataService, $location, $routeParams, toastr) { 

		var vm = this;
        vm.recipe = {};
        vm.recTags = [];

        var recipeId = $routeParams.recipeId;

        DataService.getYumRecipe(recipeId).then(function(recipe) {
            console.log('recipe', recipe);
            vm.recipe = recipe;

            DataService.getTags().then(function(dataTags) {
            	var existTags = dataTags;
            	var newTags = [];

            	if (vm.recipe.attributes.course) {
	            	var course = vm.recipe.attributes.course;
	            	for(var i = 0; i < course.length; i++ ) {
	            		newTags.push(course[i]);
	            	}
            	}

	            if (vm.recipe.attributes.cuisine) {
	            	var cuisine = vm.recipe.attributes.cuisine;
	            	for(var c = 0; c < cuisine.length; c++ ) {            		
	            		newTags.push(cuisine[c]);
	            	}
	            }


	            
	            vm.recTags = newTags.map(function(tag) {
	            	var id = 0;
	            	for (var x = 0; x < existTags.length; x++) {
	            		if(tag === existTags[x].tagName) {
	            			id = existTags[x]._id;
	            			break;
	            		}	            		
	            	}
	            	return { _id: id, tagName: tag};
	            });

	            
            });

            


        });


        vm.goBack = function() {
        	$location.path('/receta/');
        };

        vm.makeThisMine = function() {
        	
        	DataService.batchCheckTags(vm.recTags).then(function(cleanTags) {
        		var newRec = {
		            recipeName : vm.recipe.name,
		            description : 'from ' + vm.recipe.source.sourceDisplayName,
		            servingSize: vm.recipe.numberOfServings,
		            ingredients: {title: 'Ingredients', ingredients: vm.recipe.ingredientLines},	            
		            source: vm.recipe.source.sourceDisplayName,
		            sourceUrl : vm.recipe.source.sourceRecipeUrl,
		            imageUrl : vm.recipe.images[0].hostedLargeUrl,
		            yummlyId: vm.recipe.id,
		            tags: cleanTags
	        	};

	        	DataService.addNewRecipe(newRec).then(function(data) {
	        		//$location.path('/receta/view/' + data._id);
	        		//console.log(data);
	        		toastr.success(data._id);
	        		$location.path('/receta/view/' + data._id);
	        	});





        	});			
        };

	}



})();