(function() {
  
  'use strict';
  
  angular.module('recetaApp').controller('EditController', EditController);
  
  EditController.$inject= ['DataService', 'toastr', '$location', '$routeParams'];

  function EditController(DataService, toastr, $location, $routeParams) { 
    
    var vm = this;
    
    vm.name = "recipe"; 
    var instructionCounter = 0;
    
    console.info('edit loaded');
    toastr.success('leodadddd');
    vm.recipeId = $routeParams.recipeId || 'dummmmmm';
    
    
    
    DataService.getTags().then(function(tags) {
      vm.allTags = tags;
      
      DataService.getRecipe(vm.recipeId).then(function(data) {
        vm.recipe = data;
        
        instructionCounter = vm.recipe.instructions.length;
      
        for(var i=0; i < vm.allTags.length; i++) {
          if(vm.recipe.tags.indexOf(vm.allTags[i]._id) > -1 ) {
            vm.allTags[i].Selected = true;            
          }
        }
      });
    });
   
    vm.toggleSelection = function(myTag) {
      myTag.Selected = !myTag.Selected;
      var idx = vm.recipe.tags.indexOf(myTag._id);
      if (idx > -1) {
        vm.recipe.tags.splice(idx, 1);
      } else {
        vm.recipe.tags.push(myTag._id);
      }        
    };

   vm.addNewInstruction = function() {
      instructionCounter++;
      vm.recipe.instructions.push({id: instructionCounter, instruction:""});
    };
   
   vm.addNewGroup = function() {
    var newGroup = { 'title': '', 'ingredients': [{ 'ingredient': '' }] };
    if(vm.recipe.ingredients === undefined) {
      vm.recipe.ingredients = [];
    } 
    
    vm.recipe.ingredients.push(newGroup);
    
   };
   
   vm.addNewIngredient = function(group) {
    var index = vm.recipe.ingredients.indexOf(group);
    var newIng = { 'ingredient': '' };
    vm.recipe.ingredients[index].ingredients.push(newIng);
   };
   
   vm.deleteIngredient = function(ing, group) {
     vm.recipe.ingredients[group].ingredients.splice(ing, 1);
   };
   
   
   
   //function s
   vm.update = function() {
     toastr.success('Saving => ' + vm.recipe.servingSize);
     DataService.updateRecipe(vm.recipe).then(function(data) {
       //toastr.success(data);
       $location.path('/receta/view/' + vm.recipeId);
     });
   }
   
   vm.cancelEdit = function() {
     toastr.error('cancelling edit');
     $location.path('/receta/view/' + vm.recipeId);
   }
   
    
  }
  
})();