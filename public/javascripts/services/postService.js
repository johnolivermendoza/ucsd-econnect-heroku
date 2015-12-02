app.factory('postService', ['$http', 'authService', function($http, authService) {
	var postService = {
		// initialize the posts as empty
		posts: []
	};
	
	postService.createPost = function(title, desc) {
		return $http.post('/posts/' + title + '/' + desc).success(function(data){
			postService.posts.push(data);
		});
	};

	postService.getAll = function() {
		return $http.get('/posts').success(function(data) {
			angular.copy(data, postService.posts);
		});
	};



	return postService;
}]);