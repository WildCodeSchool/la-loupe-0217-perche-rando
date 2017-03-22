angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
        $stateProvider
            .state('anon', {
                abstract: true,
                data: {
                    access: AccessLevels.anon
                },
                views: {
                    'navbar@': {
                        templateUrl: 'anon/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
            .state('anon.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'anon/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('anon.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: 'anon/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('anon.register', {
                url: '/register',
                views: {
                    'content@': {
                        templateUrl: 'anon/register.html',
                        controller: 'RegisterController'
                    }
                }
            })
            .state('anon.display-trail ', { // Un circuit à afficher
                url: '/trail/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/display-trail.html',
                        controller: 'TrailController'
                    }
                }
            });
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                views: {
                    'navbar@': {
                        templateUrl: 'user/navbar.html',
                        controller: 'NavbarController'
                    }
                },
                data: {
                    access: AccessLevels.user
                }
            })
            .state('user.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'user/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('user.profile', {
                url: '/profile',
                views: {
                    'content@': {
                        templateUrl: 'user/profile.html',
                        controller: 'ProfileController'
                    }
                }
            })
            .state('user.invites', {
                url: '/invites',
                views: {
                    'content@': {
                        templateUrl: 'user/invites.html',
                        controller: 'InviteController'
                    }
                }
            })
            .state('user.trails', { // La liste des circuits
                url: '/trails',
                views: {
                    'content@': {
                        templateUrl: 'user/trails.html',
                        controller: 'TrailsController'
                    }
                }
            })
            .state('user.create-map', {
                url: '/create-map',
                views: {
                    'content@': {
                        templateUrl: 'user/create-map.html',
                        controller: 'TrailsController'
                    }
                }
            })
            .state('user.display-trail ', { // Un circuit à afficher
                url: '/trail/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/display-trail.html',
                        controller: 'TrailController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    });
