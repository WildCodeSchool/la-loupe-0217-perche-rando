angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService, TrailService) {
        const TRAIL_PER_PAGES = 10;
        $scope.cities = [];
        $scope.trails = [];
        $scope.top10 = [];

        $scope.user = CurrentUser.user();


        $scope.newuser = CurrentUser.user();
        console.log($scope.user);
        $scope.author = $scope.user._id;

        $scope.updateProfile = function() {
            UserService.update($scope.newuser._id, $scope.newuser).then(function(res) {
              console.log('update', res);
            });
        };

        function getList() {
            var filters = {author: $scope.user._id};
            var limit = 15;
            TrailService.getList(filters, limit, TRAIL_PER_PAGES * 0).then(function(res) {
                console.log('Result of trail query', res);
                $scope.trails = res.data.trails;
                // getCount(filters, TRAIL_PER_PAGES); // TODO optimize this to only one call to the backend
            });
        }
        getList();

    });
