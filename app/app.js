'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'restangular',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', 'RestangularProvider', function($locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});

  RestangularProvider.setBaseUrl('http://api.sandbox.dev');
}]);

angular.module('myApp').factory('ArticlesService', ['Restangular', function(Restangular){

  // this is service object with list of methods in it
  // this object will be used by controller
  var service = Restangular.service('articles');

  return service;

}]);

