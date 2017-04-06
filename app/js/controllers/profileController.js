angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService) {
        $scope.user = CurrentUser.user();

        $scope.newuser = CurrentUser.user();

        $scope.updateProfile = function() {
            UserService.update($scope.newuser._id, $scope.newuser);
        };


    });
