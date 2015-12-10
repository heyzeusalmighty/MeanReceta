//RecListController

(function() {

  'use strict';
  
  angular.module('recetaApp').controller('RecListController', RecListController);
  
  RecListController.$inject= ['DataService', '$location', 'toastr', '$timeout'];

  function RecListController(DataService, $location, toastr, $timeout) { 

    var vm = this;
    vm.tags = [];
    vm.recipes = [];
    vm.newTagName = '';
    vm.addingTag = false;
    vm.search = '';
    vm.searchVisible = false;
    vm.searchMatches = [];
    vm.yumPage = 0;
    vm.loading = false;
    
    
    setTags();
    
    DataService.getRecentRecipes().then(function(data) {
        vm.recipes = data;
    });

    vm.goToRecipe = function(recipe) {      
        $location.path('/recipe/view/' + recipe);
    };

  
    vm.openSearch = function() {
        vm.searchVisible = true;
        $timeout(function() {
            var searchBox = document.getElementById('yummlySearchBox');
            searchBox.focus();
        }, 100);
    };

    vm.tagSearch = function(tag) {
        console.log(tag);
    };

    vm.openRecipe = function() {
        console.log(this);
        
    };

    
    function setTags() {
        DataService.getTags().then(function(data) {
            vm.tags = data;            
        });
    }


}

})();