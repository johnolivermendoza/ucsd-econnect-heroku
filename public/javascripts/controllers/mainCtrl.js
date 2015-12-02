app.controller('MainCtrl', ['$scope', 'projectService', '$filter', 'authService', 'postService', '$window', function($scope, projectService, $filter, authService, postService, $window) {
	$scope.projects = projectService.projects;
	$scope.posts = postService.posts;
	$scope.isLoggedIn = authService.isLoggedIn;

	$scope.random = function() {
		return 0.5 - Math.random();
	};  


	$scope.addPost = function() {
		if(!$scope.postDesc || $scope.postDesc === '') {
		 return; 
		}

		var newPost = {
			title: "Custom Post",
			date: new Date(),
			description: $scope.postDesc
		};
		// Call the 'posts' Service and create a new post
		postService.createPost(newPost.title, newPost.description).success(function() {
			$window.location.reload();
		});



		$scope.title = '';
		$scope.link = '';
	};

}]);


app.controller('NavCtrl', ['$scope','authService', function($scope, authService) {
	$scope.isLoggedIn = authService.isLoggedIn;
	$scope.currentUser = authService.currentUser;
	$scope.currentUserId = authService.currentUserId;
	$scope.logOut = authService.logOut;
}]);  



app.directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Behavior goes here
        }]
    }
});
