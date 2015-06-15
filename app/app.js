'use strict';

// Declare app level module which depends on views, and components
angular.module('mapYourApp', [
  'mapYourApp.view1',
  'mapYourApp.flux',
  'ui.router',
  'ngFlux',
])
.config(['$stateProvider','$locationProvider','$urlRouterProvider', function($stateProvider,$locationProvider, $urlRouterProvider) {
  
}]);
