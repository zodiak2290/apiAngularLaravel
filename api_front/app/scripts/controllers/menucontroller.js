'use strict';

/**
 * @ngdoc function
 * @name apiFrontApp.controller:MenucontrollerCtrl
 * @description
 * # MenucontrollerCtrl
 * Controller of the apiFrontApp
 */
angular.module('apiFrontApp')
  .controller('MenucontrollerCtrl', function (authUser, $location, $scope, sessionControl) {
  		var vm = this;


  		vm.isLogin = authUser.isLoggedIn();

  		$scope.$watch(function(){
  			return authUser.isLoggedIn();
  		}, function(newVal){
  			if(typeof newVal !== 'undefined'){
  				vm.isLogin = authUser.isLoggedIn();
  			}
  		});

  		vm.logout = function(){
  			authUser.logout();
  		}

  		vm.isActive = function(viewLocation){
  			return viewLocation === $location.path();
  		}

  		vm.user = {
  			email: sessionControl.get('email'),
  			name: sessionControl.get('username'),
  			avatar: sessionControl.get('avatar'),
  		}


  		
  });
