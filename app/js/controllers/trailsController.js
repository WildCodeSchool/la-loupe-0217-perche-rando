/*
* Correspond à la liste des circuits
*/
angular.module('app')
    .controller('TrailsController', function($scope, CurrentUser, UserService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
    });
