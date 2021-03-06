'use strict';

angular.module('recetaApp')
.controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
    	User.remove({ id: user._id });
    	angular.forEach($scope.users, function(u, i) {
    		if (u === user) {
    			$scope.users.splice(i, 1);
    		}
    	});
    };


    $scope.getOldRecipes = function() {
    	$http.get("/api/oldRecipess").success(function(data) {
    		$scope.oldRecipes = data;
    	})
    };

    $scope.addRecipe = function(recipe) {
    	console.info(recipe);
    	$http.post("/api/oldRecipess", recipe).success(function(data) {
    		console.log('data', data);
    	})
    }

});
