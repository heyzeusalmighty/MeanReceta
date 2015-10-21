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


            if (vm.recipe.attributes.course) {
            	var course = vm.recipe.attributes.course;
            	for(var i = 0; i < course.length; i++ ) {
            		vm.recTags.push(course[i]);
            	}
            }

            if (vm.recipe.attributes.cuisine) {
            	var cuisine = vm.recipe.attributes.cuisine;
            	for(var i = 0; i < cuisine.length; i++ ) {            		
            		vm.recTags.push(cuisine[i]);
            	}
            }



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
		            ingredients: vm.recipe.ingredientLines,	            
		            source: vm.recipe.source.sourceDisplayName,
		            sourceUrl : vm.recipe.source.sourceRecipeUrl,
		            yummlyId: vm.recipe.id,
		            tags: cleanTags
	        	};

        	})
        	



        };

	}



})();