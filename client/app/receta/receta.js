
'use strict';

angular.module('recetaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/receta', {
        templateUrl: 'app/receta/pages/list.html',
		controller: 'ListController',
		controllerAs: 'list'
      })

      .when('/receta/view/:recipeId', {
      	templateUrl: 'app/receta/pages/view.html',
      	controller: 'ViewController',
      	controllerAs: 'view'
      })

      .when('/receta/new', {
      	templateUrl: 'app/receta/pages/newRecipe.html',
      	controller: 'NewRecipeController',
      	controllerAs: 'rec'
      })

      .when('/receta/edit/:recipeId', {
        templateUrl: 'app/receta/pages/edit.html',
        controller: 'EditController',
        controllerAs: 'rec'
      })

      .when('/receta/yummly/:recipeId', {
        templateUrl: 'app/receta/pages/yummly.html',
        controller: 'YummlyController',
        controllerAs: 'yum'
      })


        // .when("/", {
        //   templateUrl: "pages/list.html",
        //   controller: 'ListController',
        //   controllerAs: 'list'
        // })
        
        // .when("/home", {
        //   templateUrl: "pages/landing.html",
        //   controller: 'MainController',
        //   controllerAs: 'main'
        // })
      
        // .when("/receta/list", {
        //   templateUrl: "pages/list.html",
        //   controller: 'ListController',
        //   controllerAs: 'list'
        // })
        
        // .when("/contact", {
        //   templateUrl: "pages/landing.html",
        //   controller: 'MainController',
        //   controllerAs: 'main'
        // })
        
        // .when("/new", {
        //   templateUrl: "pages/newRecipe.html",
        //   controller: 'NewRecipeController',
        //   controllerAs: 'rec'
        // })
        
        // .when("/view/:recipeId", {
        //   templateUrl: "pages/view.html",
        //   controller: 'ViewController',
        //   controllerAs: 'view'
        // })
        
        // .when("/edit/:recipeId", {
        //   templateUrl: "pages/edit.html",
        //   controller: "EditController",
        //   controllerAs: 'rec'
        // });
        
        
      
    });
  
  
  
  
// })();


//   });