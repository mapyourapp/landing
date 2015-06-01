'use strict';

angular.module('mapYourApp.view1', [])
.controller('View1Ctrl', [function() {
  var vm = this;
  vm.headline = "ARE YOU FUCKING SORRY";
  console.log(vm.headline)
}]);