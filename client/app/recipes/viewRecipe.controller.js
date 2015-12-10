(function() {

    'use strict';

    angular.module('recetaApp').controller('ViewRecipeController', ViewRecipeController);

    ViewRecipeController.$inject= ['DataService', '$location', '$routeParams'];

    function ViewRecipeController(DataService, $location, $routeParams) { 
        var vm = this;
        vm.recipe = {};
        vm.loading = false;
        
        var recipeId = $routeParams.recipeId;
        
        vm.loading = true;
        DataService.getRecipe(recipeId).then(function(data) {
            vm.recipe = data;
            vm.loading = false;

            DataService.getTags().then(function(tags) {
                vm.foodTags = tags;

                vm.recipeTags = tags.filter(function(tag) {
                    return (data.tags.indexOf(tag._id) > -1);
                }).map(function(x) {
                    return x.tagName;
                });

                //vm.showInstructionGetter = (vm.recipe.instructions.length === 0 && vm.recipe.sourceUrl.length > 0);

            });
        });

      

        vm.backToList = function() {
            $location.path('/recipe');
        };

        
        


    }

})();