var app = angular.module('appBehance', []);

$userDefault  = (user == '') ? 'imcreator' : user;
$urlUser = 'http://behance.net/v2/users/'+ $userDefault +'?api_key='+ apiKey + '&callback=JSON_CALLBACK';

//load api user
app.controller('controllerUser', function($scope, $http){

    $http.jsonp($urlUser).success(function(data){
    	$scope.data = data;
    }).error(function(data, status){
    	console.warn("ApiKey not found! status: " + status);
    });

});

//load api project especific
app.controller('controllerProject', function($scope, $http){

    uptadeProject(1);

    $scope.loadProject = function(count){
        uptadeProject(count+1);
    };

    $scope.projects = [];

    function uptadeProject(count){

        $urlProject = 'http://behance.net/v2/users/'+ $userDefault +'/projects?api_key='+ apiKey + '&page=' + count + '&callback=JSON_CALLBACK';

        $http.jsonp($urlProject).success(function(data){

            angular.forEach(data.projects, function(p){
                $scope.projects.push(p);
            });

	    }).error(function(data, status){
	    	console.warn("ApiKey not found! status: " + status);
	    });

	};

    $scope.selectProject = function(project){

    	$scope.modalContent = false;

        $urlEspecificProject = 'http://www.behance.net/v2/projects/'+ project +'?api_key='+ apiKey +'&callback=JSON_CALLBACK';
        $urlCommentProject = 'http://www.behance.net/v2/projects/'+ project +'/comments?api_key='+ apiKey +'&callback=JSON_CALLBACK';

        $http.jsonp($urlEspecificProject).success(function(data){
            $scope.dataProject = data;
            $scope.modalContent = true;
        }).error(function(data, status){
            console.warn("ApiKey not found! status: " + status);
        });
    
        $http.jsonp($urlCommentProject).success(function(data){
            $scope.commentsProject = data;
        }).error(function(data, status){
            console.warn("ApiKey not found! status: " + status);
        });

    };


});

//converter em html
app.filter('html', ['$sce', function($sce) { 
    return function(text) {
        return $sce.trustAsHtml(text);
    };    
}]);