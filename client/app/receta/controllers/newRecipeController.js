
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
    vm.instructions = [{ id: 1, instruction: ""}];
    vm.newRecipe = {
      'RecipeName': 'dd',
      'RecipeId': '',
      'Description': '',
      'ServingSize': ''
    };
    

    //vm.Recipe = angular.copy(newRecipeTemplate);
    
    vm.addNewRecipe = function() {
      //toastr.success('','HI');
      
      var cleanedTags = vm.recipeTags.map(function(x) {
        //return { TagName : x.TagName, TagId : x.TagId }
        //return { x._id }
      });

      console.log('tags :: ' + cleanedTags);
      
      
      console.table(vm.newRecipe)
      var newRec = {
        recipeName : vm.newRecipe.RecipeName,
        description : vm.newRecipe.Description,
        servingSize: vm.newRecipe.ServingSize,
        ingredients: vm.ingredients,
        instructions: vm.instructions,
        tags: vm.recipeTags
      };
      
      DataService.addNewRecipe(newRec).then(function(data) {
        toastr.success("Saved Successfully");
        $location.path('receta');
      });
      
      
    };

    vm.addNewInstruction = function() {
      instructionCounter++;
      vm.instructions.push({id: instructionCounter, instruction:""});
    };
    
    
    vm.addNewGroup = function() {
      var newGroup = { 'Title': '', 'RecipeId': 0, 'Ingredients': [{ 'Ingredient': '' }] };
        vm.ingredients.push(newGroup);
    };
    
    vm.addNewIngredient = function(group) {
      var index = vm.ingredients.indexOf(group);
      var newIng = { 'Ingredient': '' };
      vm.ingredients[index].Ingredients.push(newIng);
    }
    
    vm.deleteIngredient = function (ing, group) {
        vm.ingredients[group].Ingredients.splice(ing, 1);
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
    
  }
  
})();