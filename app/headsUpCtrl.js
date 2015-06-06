angular.module('app').controller('HeadsUpCtrl', ['$scope', 'MovieDataService', function ($scope, MovieDataService) {
  $scope.movies = [];

  findAll();

  function findAll(){
    chrome.storage.sync.get('movies', function(data) {
      data.movies.forEach(function(movie){
        $scope.movies.push(movie.title);
      })
      $scope.$apply();
    });
  }


}]);