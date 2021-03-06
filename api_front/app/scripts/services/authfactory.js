'use strict';

/**
 * @ngdoc service
 * @name apiFrontApp.authFactory
 * @description
 * # authFactory
 * Factory in the apiFrontApp.
 */
angular.module('authFactory', [])
  .factory('sessionControl', [function () {
    return {
        get: function(key){
          return sessionStorage.getItem(key);
        },

        set: function(key, val){
          return sessionStorage.setItem(key, val);
        },

        unset: function(key){
          return sessionStorage.removeItem(key);
        }
    };
  }])

  .factory('authUser', function($auth, GooglePlus, sessionControl, toastr, $location) {
      var chacheSession = function(email, username, avatar){
          sessionControl.set('userIsLogin', true);
          sessionControl.set('email', email);
          sessionControl.set('username', username);
          sessionControl.set('avatar', avatar);
      }

      var unCacheSession = function(){
          sessionControl.unset('userIsLogin');
          sessionControl.unset('email');
          sessionControl.unset('username');
          sessionControl.unset('avatar');
      }

      var login = function(loginForm) {
          $auth.login( loginForm).then(
              function( response){
                if(typeof response.data.user != 'undefined'){
                  chacheSession(response.data.user.email, response.data.user.name, loginForm.avatar);
                  $location.path('/');
                  //location.pathname = '/';
                  toastr.success('Bienvenido ' + sessionControl.get('username'));
                  console.log(sessionControl.get('userIsLogin') !== null);
                }else{
                  console.log(response);
                }
              },
              function(error){
                unCacheSession();
                if(error.data.error === 'invalid_credentials'){
                  toastr.error('Usuario o contraseña incorrectos', "Error");
                }
                console.log(error);
              }
          );
      };
    
    return {
      loginApi: function(loginForm) {
          login(loginForm);
      },

      logout: function(){
        $auth.logout();
        unCacheSession();
        toastr.success('Vuelve pronto');
        $location.path('/login');
      },

      loginGooglePlus: function(){
        GooglePlus.login().then(
          function(){
            GooglePlus.getUser().then(function(response){
              var loginForm = {
                name: response.name,
                email: response.email,
                avatar: response.picture
              }

              login(loginForm);
            });
          }
        )
      },

      isLoggedIn: function(){
        return sessionControl.get('userIsLogin') !== null;
      },

    };
  });
