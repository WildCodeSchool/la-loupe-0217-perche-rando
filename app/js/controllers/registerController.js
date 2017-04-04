angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {

        $scope.user = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            img: {}
        };
        $scope.register = function() {
            Auth.register($scope.user).then(function() {
              console.log($scope.user);
                $state.go('anon.home');
            });
        };

    });
