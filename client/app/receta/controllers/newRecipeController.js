
(function() {

  'use strict';
  
  angular.module('recetaApp').controller('NewRecipeController', NewRecipeController);
  
  NewRecipeController.$inject= ['DataService', 'toastr', '$location'];

  function NewRecipeController(DataService, toastr, $location) { 

    var vm = this;

    vm.foodTags = [];
    
    DataService.getTags().then(function(data) {
        vm.foodTags = data;
    });
    
    var instructionCounter = 1;
    vm.recipeTags = [];
    vm.ingredients = [];
    vm.instructions = [{ id: 1, instruction: ''}];
    vm.newRecipe = {
      'RecipeName': 'dd',
      'RecipeId': '',
      'Description': '',
      'ServingSize': ''
    };
    vm.addingTag = false;
    vm.newTagName = '';


    
    vm.addNewRecipe = function() {
     

        var cleanedIngs = [];
        for(var i = 0; i < vm.ingredients.length; i++) {
            var group = vm.ingredients[i];
            var newG = { title: group.title, ingredients: group.ingredients.map(function(x) { return x.ing })};
            console.info('newG', newG);
            cleanedIngs.push(newG);
        }

        var newRec = {
            recipeName : vm.newRecipe.RecipeName,
            description : vm.newRecipe.Description,
            servingSize: vm.newRecipe.ServingSize,
            ingredients: cleanedIngs,
            instructions: vm.instructions,
            tags: vm.recipeTags
        };

        DataService.addNewRecipe(newRec).then(function() {
            toastr.success('Saved Successfully');
            $location.path('receta');
        });
    };

    vm.addNewInstruction = function() {
        instructionCounter++;
        vm.instructions.push({id: instructionCounter, instruction:''});
    };


    vm.addNewGroup = function() {
        var newGroup = { 'title': '', 'ingredients': [{'ing':''}]};
        vm.ingredients.push(newGroup);
    };

    vm.addNewIngredient = function(group) {
        var index = vm.ingredients.indexOf(group);
        console.log(vm.ingredients[index]);
        vm.ingredients[index].ingredients.push({'ing':''});
    };

    vm.deleteIngredient = function (ing, group) {
        vm.ingredients[group].ingredients.splice(ing, 1);
    };

    vm.toggleSelection = function(myTag) {
        myTag.Selected = !myTag.Selected;
        var idx = vm.recipeTags.indexOf(myTag);
        if (idx > -1) {
            vm.recipeTags.splice(idx, 1);
        } else {
            vm.recipeTags.push(myTag);
        }           
    };

    vm.addNewTag = function() {
        vm.addingTag = true;
    };

    vm.saveTag = function() {
        console.info(vm.recipeTags);
        var tagTag = { tagName: vm.newTagName};
        DataService.addNewTag(tagTag).then(function(data) {
            toastr.success('Successfully created ' + data.tagName);
            vm.foodTags.push(data);
            //setTags();
            vm.addingTag = false;
            vm.newTagName = "";
        });
    };

    vm.cancelTag = function() {
        vm.addingTag = false;
        vm.newTagName = '';
    };   

}

})();