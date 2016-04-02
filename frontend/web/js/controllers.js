var controllers = angular.module('controllers', []);
controllers.controller('MainController', ['$scope', '$location', '$window', '$mdSidenav',
    function ($scope, $location, $window, $mdSidenav) {
        $scope.loggedIn = function() {
            return Boolean($window.sessionStorage.access_token);
        };
        $scope.unLoggedIn = function() {
            return !Boolean($window.sessionStorage.access_token);
        };
        $scope.logout = function () {
          console.log("Удалить");
            console.log($window.sessionStorage);
            delete $window.sessionStorage.access_token;
            $location.path('/').replace();
        };
        $scope.isActive = function (viewLocation) {
             var active = (viewLocation === $location.path());
             return active;
        };
        $scope.openLeftMenu = function () {
          $mdSidenav('leftNav').toggle();
          $scope.$broadcast('$routeChangeSuccess', eventData);
        }

        // менюшки
        var menuTabs = [
          { icon: 'list', click: $scope.openLeftMenu },
          { title: 'Главная', link: '/' },
          { title: 'О сайте', link: '/about' },
          { title: 'Контакты', link: '/contact' },
          { title: 'Личный кабинет', link: '/dashboard', hide: $scope.unLoggedIn },
          { title: 'Войти', link: '/login', hide: $scope.loggedIn },
          { title: 'Выйти', link: '/logout', hide: $scope.unLoggedIn, click: $scope.logout, button: true },
          { title: 'Присоединиться', link: '/signup', hide: $scope.loggedIn },
        ];
        $scope.menuTabs = menuTabs;

        $scope.selectedMenu = -1;
        // выьор вкладки по url
        $scope.$on('$routeChangeSuccess', function(event, next, current) {
          if (next.$$route != undefined) {
            var path = next.$$route.originalPath;
            for (var i = 0; i < menuTabs.length; i++) {
              if (menuTabs[i].link == path)
              {
                $scope.selectedMenu = i;
              }
            }
          }
        });

        $scope.$watch('selectedMenu', function(current, old){
          if (old in menuTabs) {
            var tab = menuTabs[current];
            if (tab.link != undefined) {
              if (!tab.button) {
                $location.path(tab.link).replace();
              }
              else {
                $location.path('/').replace();
              }
            }
          }
        });
    }
]);

controllers.controller('DashboardController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('index.php/api/dashboard').success(function (data) {
           $scope.dashboard = data;
        })
    }
]);

controllers.controller('ContactController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.captchaUrl = 'index.php/site/captcha';
        $scope.contact = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post('index.php/api/contact', $scope.contactModel).success(
                function (data) {
                    $scope.contactModel = {};
                    $scope.flash = data.flash;
                    $window.scrollTo(0,0);
                    $scope.submitted = false;
                    $scope.captchaUrl = 'index.php/site/captcha' + '?' + new Date().getTime();
            }).error(
                function (data) {
                    angular.forEach(data, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
            );
        };

        $scope.refreshCaptcha = function() {
            $http.get('index.php/site/captcha?refresh=1').success(function(data) {
                $scope.captchaUrl = data.url;
            });
        };
    }]);

controllers.controller('LoginController', ['$scope', '$http', '$window', '$location',
    function($scope, $http, $window, $location) {
        $scope.login = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post('index.php/api/login', $scope.userModel).success(
                function (data) {
                    $window.sessionStorage.access_token = data.access_token;
                    $location.path('/dashboard').replace();
            }).error(
                function (data) {
                    angular.forEach(data, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
            );
        };
    }
]);

controllers.controller('SignupController', ['$scope', '$http', '$window', '$location',
    function($scope, $http, $window, $location) {
        $scope.signup = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post('index.php/api/signup', $scope.userModel).success(
                function (data) {
                    $window.sessionStorage.access_token = data.access_token;
                    $location.path('/dashboard').replace();
            }).error(
                function (data) {
                    angular.forEach(data, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
            );
        };
    }
]);
