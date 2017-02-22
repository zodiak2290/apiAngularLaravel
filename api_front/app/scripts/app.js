'use strict';

/**
 * @ngdoc overview
 * @name apiFrontApp
 * @description
 * # apiFrontApp
 *
 * Main module of the application.
 */
angular
  .module('apiFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'authFactory',
    'toastr'
  ])
  .config(function ($routeProvider, $authProvider, $locationProvider) {
    $authProvider.loginUrl = 'http://localhost:8000/api/auth_login';

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $location, authUser, toastr){
      var rutasPrivadas = ['/', '/about'];

      $rootScope.$on('$routeChangeStart', function(){
          if( ($.inArray($location.path(), rutasPrivadas) !== -1) && !authUser.isLoggedIn()){
            toastr.error('No has iniciado sesión', 'Mensaje')
            $location.path('/login');
          }
      });
  });