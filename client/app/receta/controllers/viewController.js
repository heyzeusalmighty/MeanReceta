(function() {

    'use strict';

    angular.module('recetaApp').controller('ViewController', ViewController);

    ViewController.$inject= ['DataService', '$location', '$routeParams', 'toastr'];

    function ViewController(DataService, $location, $routeParams, toastr) { 
        var vm = this;
        vm.recipe = {};
        //var recipe = DataService.getRecipe(recipe);

        toastr.success('loaded');

        var recipeId = $routeParams.recipeId;
        vm.showInstructionGetter = false;

        console.log('recipe ID => ' + recipeId);

        DataService.getRecipe(recipeId).then(function(data) {
            vm.recipe = data;

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
            toastr.success(recipeId);
            DataService.getInstructions(recipeId).then(function(data) {
                vm.instructionData = data;
            })
        };

    }

})();