(function() {
    'use strict';

    angular.module('recetaApp').factory('DataService', DataService);


    DataService.$inject = ['$http', '$q'] ;


    function DataService($http, $q) {
        //var recipes = []; 
        //var recTags = [];

        var service = {
            getTags : getTags,
            getRecentRecipes : getRecentRecipes,
            addNewTag : addNewTag,
            addNewRecipe : addNewRecipe,
            getRecipe : getRecipe,
            updateRecipe : updateRecipe,
            searchYum : searchYum
        };
        return service;
/////////////////////////////////////////


        function getTags() {
            var deferred = $q.defer();
            $http.get('/api/tags').success(function(allZeTags) {
                deferred.resolve(allZeTags);
            });  
            return deferred.promise;
        }

        function addNewTag(tagName) {
            var deferred = $q.defer();
            $http.post('/api/tags', tagName).success(function(data) {
                //console.info(data);
                deferred.resolve(data);
            });  
            return deferred.promise;
        }

        function getRecentRecipes() {
            var deferred = $q.defer();
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
        }

        function updateRecipe(recipe) {
            var deferred = $q.defer();
            $http.put('/api/recipes/' + recipe._id, recipe).success(function(rec) {
                deferred.resolve(rec);
            });   
            return deferred.promise;
        }

        function searchYum(term) {
            var deferred = $q.defer();

            $http.get('/api/yum/' + term).success(function(rec) {
                deferred.resolve(rec);
            });   
            return deferred.promise;
        }

    }


})();