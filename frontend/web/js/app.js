var app = angular.module('app', [
    'ngRoute',      //$routeProvider
    'mgcrea.ngStrap',//bs-navbar, data-match-route directives
    'controllers',       //Our module frontend/web/js/controllers.js
    'ngMaterial'
]);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/index.html',
            }).
            when('/about', {
                templateUrl: 'partials/about.html'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactController'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            }).
            when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'SignupController'
            }).
            when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardController'
            }).
            when('/logout', {
                redirectTo: '/'
            }).
            otherwise({
                templateUrl: 'partials/error.html'
            });
        $httpProvider.interceptors.push('authInterceptor');
    }
]);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('deep-orange');
});

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('fa', 'fontawesome');
});

app.factory('authInterceptor', function ($q, $window, $location) {
    return {
        request: function (config) {
            if ($window.sessionStorage.access_token) {
                //HttpBearerAuth
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.access_token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login').replace();
            }
            return $q.reject(rejection);
        }
    };
});
