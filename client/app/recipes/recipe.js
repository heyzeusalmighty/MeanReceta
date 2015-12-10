'use strict';

angular.module('recetaApp')
  .config(function ($routeProvider) {
    $routeProvider
    	.when('/recipe', {
        	templateUrl: 'app/recipes/recipeList.html',
			controller: 'RecListController',
			controllerAs: 'list'
		})
    	.when('/recipe/view/:recipeId', {
	      	templateUrl: 'app/recipes/view.html',
	      	controller: 'ViewRecipeController',
	      	controllerAs: 'view'
	    })
});