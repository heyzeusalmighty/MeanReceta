(function() {
  
  'use strict';
  
  angular.module('recetaApp').controller('ListController', ListController);
  
  ListController.$inject= ['DataService', '$location'];

  function ListController(DataService, $location) { 
    
    var vm = this;
    vm.tags = [];
    vm.recipes = [];
    vm.name = "list";
    
    DataService.getTags().then(function(data) {
      vm.tags = data;
      console.log(data);
    });
    
    
    DataService.getRecentRecipes().then(function(data) {
      vm.recipes = data;
    });

    vm.makeNewRecipe = function() {
      $location.path('/receta/new');
    }
    
    
    vm.goToRecipe = function(recipe) {
      
      $location.path('/receta/view/' + recipe);
    }
    
  }
  
})();