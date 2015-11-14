(function() {

  'use strict';
  
  angular.module('recetaApp').controller('ListController', ListController);
  
  ListController.$inject= ['DataService', '$location', 'toastr', '$timeout'];

  function ListController(DataService, $location, toastr, $timeout) { 

    var vm = this;
    vm.tags = [];
    vm.recipes = [];
    vm.newTagName = "";
    vm.addingTag = false;
    vm.yumSearch = "";
    vm.searchVisible = false;
    vm.searchMatches = [];
    vm.yumPage = 0;
    vm.loading = false;
    
    
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

    vm.openSearch = function() {
        vm.searchVisible = true;
        $timeout(function() {
            var searchBox = document.getElementById("yummlySearchBox");
            searchBox.focus();
        }, 100);

    }

    vm.nextPage = function() {
        vm.yumPage++;
        vm.searchYummy();
    };

    vm.prevPage = function() {
        vm.yumPage--;
        vm.searchYummy();
    };

    vm.searchYummy = function() {
        vm.loading = true;
        DataService.searchYum(vm.yumSearch, vm.yumPage).then(function(data) {
            vm.loading = false;
            vm.searchMatches = [];

            toastr.success(data.totalMatchCount + ' total matches');
            if(data.matches) {
                //vm.searchMatches = data.matches;

                vm.searchMatches = data.matches.map(function(match) {
                    
                    var imageUrl = "";
                    if(match.imageUrlsBySize) {
                        imageUrl = match.imageUrlsBySize[90];  
                    }
                                
                    
                    return { 
                        'name': match.recipeName, 
                        'image': imageUrl,
                        'recipeId' : match.id,
                        'source' : match.sourceDisplayName
                    };
                });

            }


        });
    };

    vm.goToYummly = function(recipeId) {
        console.log(recipeId);
        $location.path('/receta/yummly/' + recipeId);
    }


    function setTags() {
        DataService.getTags().then(function(data) {
            vm.tags = data;            
        });
    }
}

})();