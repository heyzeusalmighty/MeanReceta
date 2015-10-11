(function() {
  'use strict';
  
  angular.module('recetaApp')
    .factory('DataService', DataService);
    
    
  DataService.$inject = ['$http', '$q'] ;
  
  //$firebaseArray
  //$firebaseObject
  function DataService($http, $q) {
    
    var fireUrl = "https://boiling-fire-2564.firebaseio.com"
    //var ref = new Firebase(fireUrl);
    // download the data into a local object
    console.log(fireUrl);
    //$scope.data = $firebaseObject(ref);
    //console.log($firebaseObject(ref));
    //console.log($firebaseArray(ref));
    
    
    var recipes = []; 
    var recTags = [];
    
    
    
    var service = {
      getTags : getTags,
      getRecentRecipes : getRecentRecipes,
      addNewTag : addNewTag,
      addNewRecipe : addNewRecipe,
      getRecipe : getRecipe,
      updateRecipe : updateRecipe
    };
    return service;
    /////////////////////////////////////////
    
    
    function getTags() {
      
      //console.log('getTags');
      
       var deferred = $q.defer();

       $http.get('/api/tags').success(function(allZeTags) {
          deferred.resolve(allZeTags);
       });  

       // var tags = [{ TagName: 'Fingers', TagId: 1 }, 
       //  { TagName: 'Arbor Day', TagId: 2 },
       //  { TagName: 'Chicken', TagId: 3 }];
       //  deferred.resolve(tags);
        return deferred.promise;
    }
    
    function addNewTag(tagName) {
      //$firebaseArray
      
      
      // recTags = $firebaseArray(ref.child("tags"));
      // recTags.$add({ TagName: tagName});
      
      
      
    }
    
    function getRecentRecipes() {
      
       var deferred = $q.defer();
      // recipes = $firebaseArray(ref.child("recipes")).$loaded().then(function(tagData) {
      //   var mappedArr = tagData.map(function(d) {
      //     return  { RecipeName: d.RecipeName, RecipeId: d.$id }
      //   });
      //var mappedArr = [{"recipeName" : "Tango"}, {"recipeName" : "Keyboard Master" }, {"recipeName" : "Robot"}];
      $http.get('/api/recipes').success(function(awesomeThings) {
        deferred.resolve(awesomeThings);
      });
      return deferred.promise;
    }
      
      
      
    
    function addNewRecipe(rec) {
      var deferred = $q.defer();
      
      $http.post('/api/recipes', rec).then(function() {
        deferred.resolve('success');
      });

      return deferred.promise;

    }
    
    function getRecipe(recipeId) {
      
      var deferred = $q.defer();
      $http.get('/api/recipes/' + recipeId).success(function(rec){
        deferred.resolve(rec);
      });
      return deferred.promise;


      // recipes = $firebaseArray(ref.child("recipes")).$loaded().then(function(recData) {
        
      //   var reci = recData.$getRecord(recipeId);
      //   deferred.resolve(reci);
      // });
      // return deferred.promise;
    }
    
    function updateRecipe(recipe) {
      
      // var deferred = $q.defer();
      // console.info(recipe.$id);
      // var oldRec = new Firebase(fireUrl + "/recipes/" + recipe.$id);
      // console.log(oldRec);
      // deferred.resolve("success");
      // //var oldRec = ref.child("recipes/" + recipe.$id);
      // //oldRec.set(recipe);
      
      // return deferred.promise;
    }
    
  }
  
  
})();