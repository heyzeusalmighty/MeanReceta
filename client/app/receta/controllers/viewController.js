(function() {

    'use strict';

    angular.module('recetaApp').controller('ViewController', ViewController);

    ViewController.$inject= ['DataService', '$location', '$routeParams', 'toastr', '$timeout'];

    function ViewController(DataService, $location, $routeParams, toastr, $timeout) { 
        var vm = this;
        vm.recipe = {};
        vm.activelyDeleting = false;
        vm.loading = false;
        vm.showInstructionGetter = false;
        
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

                vm.showInstructionGetter = (vm.recipe.instructions.length === 0 && vm.recipe.sourceUrl.length > 0);

            });
        });



        vm.commenceEditing = function() {
            console.log(recipeId);
            toastr.info(recipeId);
            $location.path('/receta/edit/' + recipeId);     
        };   

        vm.backToList = function() {
            $location.path('/receta');
        };

        vm.getInstructions = function() {
            toastr.success('Getting Instructions');
            DataService.getInstructions(recipeId).then(function(data) {
                vm.instructionData = data;
                vm.recipe.instructions = data;
                vm.showInstructionGetter = false;
            });
        };

        vm.deleteRecipe = function() {
            vm.activelyDeleting = true;   
        };

        vm.cancelDelete = function() {
            vm.activelyDeleting = false;
        };

        vm.actuallyDeleteRecipe = function() {
            vm.activelyDeleting = false;
            DataService.deleteRecipe(recipeId).then(function() {
                toastr.error('Recipe deleted');
                $timeout(function() {
                     $location.path('/receta');
                 }, 3000);
               
            });
        };

    }

})();