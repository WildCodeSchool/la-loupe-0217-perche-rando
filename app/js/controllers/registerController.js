angular.module('app')
    .controller('RegisterController', ['$base64', '$scope', function($scope, $state, Auth, $base64) {
        $scope.imgProfile = $base64.encode('user.img');
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

    }]);
