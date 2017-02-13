var app = angular.module(
    // main module
    'oybweb',
    [
        // dependencies
        'ui.router'
    ]
);

// Our router
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state(
                'home',
                {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                }
            )
            .state(
                'posts',
                {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                }
            );
        $urlRouterProvider.otherwise('home');
    }
]);

// posts services
// to access posts from any angular module / service
app.factory(
    'posts',
    [
        function(){
            var o = {
                posts: []
            };
            return o;
        }
    ]
);

// our main controller
app.controller(
    'MainCtrl',
    [
        '$scope',
        'posts',
        function($scope, posts){
            $scope.posts = posts.posts;

            $scope.addPost = function(){
            // adds a post to our post list
                if(!$scope.title || $scope.title === '') { return; }

                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0,
                    comments: [
                        {author: 'Joe', body: 'Cool post!', upvotes: 0},
                        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                    ]
                });
                $scope.title = '';
                $scope.link = '';
            };

            $scope.incrementUpvotes = function(post) {
            // increments upvotes for a post
                post.upvotes += 1;
            };
        }
    ]
);

// display comments on posts
app.controller(
    'PostsCtrl',
    [
        '$scope',
        '$stateParams',
        'posts',
        function($scope, $stateParams, posts){
            $scope.post = posts.posts[$stateParams.id];

            $scope.addComment = function(){
                if($scope.body === '') { return; }
                $scope.post.comments.push({
                    body: $scope.body,
                    author: 'user',
                    upvotes: 0
                });
                $scope.body = '';
            };
        }
    ]
);