'use strict';

angular.module('apiFrontApp')
	.controller('LoginCtrl', function(authUser) {
		var vm = this;

		vm.loginForm = {
			email: 'albon_marvel@hotmail.com',
			password: '123456'
		};

		vm.login = function (){
			authUser.loginApi(vm.loginForm);	
		}

		vm.loginGooglePlus = function(){
			authUser.loginGooglePlus(); 
		}
	
	});