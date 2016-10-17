'use strict';

angular.module('myApp.view1', ['ngRoute', 'restangular'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'Restangular', 'ArticlesService', function($scope, Restangular, ArticlesService) {

  $scope.loader = true;

  $scope.initNewArticle = function(){
    $scope.newArticle = {
      title : "",
      body : "",
      createdBy : ""
    };
  };

  $scope.loadAll = function(item, event){
/*    Restangular.oneUrl('articles', 'http://api.sandbox.dev/articles').get().then(function(result) {
      $scope.loader = false;
      $scope.articles = result;
    });*/
    $scope.loader = true;
    $scope.articles = [];
    ArticlesService.getList().then(function(result) {
      $scope.articles = result;
      $scope.loader = false;
    })
  };

  $scope.submitArticle = function(item, event){
    //console.log($scope.newArticle);
   /* Restangular.oneUrl('articles', 'http://api.sandbox.dev/articles').post($scope.newArticle).then(function(result) {
      console.log(result);
      $scope.initNewArticle();
      $scope.loadAll();
    });*/
    $scope.loader = true;
    ArticlesService.post($scope.newArticle).then(function(data) {
      $scope.loader = false;
      //console.log(data);
      $scope.initNewArticle();
      $scope.loadAll();
    })
  };

  $scope.deleteArticle = function(articleId) {
    $scope.loader = true;
    ArticlesService.one(articleId).remove().then(function() {
      $scope.loader = false;
      $scope.loadAll();
    })
  };

  $scope.initNewArticle();
  $scope.loadAll();

}]);