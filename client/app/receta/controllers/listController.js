(function() {

  'use strict';
  
  angular.module('recetaApp').controller('ListController', ListController);
  
  ListController.$inject= ['DataService', '$location', 'toastr'];

  function ListController(DataService, $location, toastr) { 

    var vm = this;
    vm.tags = [];
    vm.recipes = [];
    vm.newTagName = "";
    vm.addingTag = false;
    
    
    setTags();
    
    DataService.getRecentRecipes().then(function(data) {
        vm.recipes = data;
    });

    vm.makeNewRecipe = function() {
        $location.path('/receta/new');
    };


    vm.goToRecipe = function(recipe) {      
        $location.path('/receta/view/' + recipe);
    };

    vm.gonnaAddTag = function() {
        vm.addingTag = true;
    };

    vm.newTag = function() {
        var tagTag = { tagName: vm.newTagName};
        DataService.addNewTag(tagTag).then(function(data) {
            toastr.success(data);
            setTags();
            vm.addingTag = false;
            vm.newTagName = "";
        });
    };

    vm.cancelTag = function() {
        vm.addingTag = false;
        vm.newTagName = "";
    }


    function setTags() {
        DataService.getTags().then(function(data) {
            vm.tags = data;            
        });
    }
}

})();