var app = angular.module('appBehance', []);

//load api user
app.controller('controllerUser', function($scope, $http){

  $scope.newUser  = "imcreator"; //user default
  $apiKey         = 'Q3DmegPI3gPgna4Zg0BqjkGo4fdx6X01'; //apikey by imcreator
  $testUser       = false;
  $scope.showDemo = true;

  $loadDataUser = function(newUser){

    $urlUser = 'http://behance.net/v2/users/'+ newUser +'?api_key='+ $apiKey + '&callback=JSON_CALLBACK';

    $http.jsonp($urlUser).success(function(data){
      $scope.data = data;
      if($testUser){
        document.querySelector("#user_name").classList.add("valid");
        document.querySelector("#user_name").classList.remove("invalid");
      }
    }).error(function(data, status){
      if($testUser){
        document.querySelector("#user_name").classList.add("invalid");
        document.querySelector("#user_name").classList.remove("valid");
      }
      console.warn("data user not found! status: " + status);
    });

    $scope.closeDemo = function(){
      $scope.showDemo = false;
    };

  };

});

//load api project especific
app.controller('controllerProject', function($scope, $http){

  $uptadeProject = function(count, newUser){
    $urlProject = 'http://behance.net/v2/users/'+ newUser +'/projects?api_key='+ $apiKey + '&page=' + count + '&callback=JSON_CALLBACK';
    $http.jsonp($urlProject).success(function(data){
      $scope.projects = [];
      angular.forEach(data.projects, function(p){
        $scope.projects.push(p);
      });
    }).error(function(data, status){
      console.warn("uptade project not found! status: " + status);
    });
  };

  $loadDataUser($scope.newUser); //load profile
  $uptadeProject(1, $scope.newUser); //load projects

  $scope.projects = [];

  $scope.toggleUser = function(newUser){
    $testUser = true;
    $loadDataUser(newUser)
    $uptadeProject(1, newUser);
  };

  $scope.loadProject = function(count){
    $uptadeProject(count+1, $scope.user);
  };

  $scope.selectProject = function(project){
    $scope.modalContent = false;
    $urlEspecificProject = 'http://www.behance.net/v2/projects/'+ project +'?api_key='+ $apiKey +'&callback=JSON_CALLBACK';
    $urlCommentProject = 'http://www.behance.net/v2/projects/'+ project +'/comments?api_key='+ $apiKey +'&callback=JSON_CALLBACK';
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
