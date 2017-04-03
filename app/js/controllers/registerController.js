angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {
      $scope.user = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        img: ''
      };
      console.log('user', $scope.user);

        $scope.register = function() {
            Auth.register($scope.user).then(function() {
                $state.go('anon.home');
            });
        };
    });
