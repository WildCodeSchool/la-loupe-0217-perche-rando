/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, TrailService) {
        $scope.Cities = [];
        TrailService.getList().then(function(res) {
            $scope.Cities = res.data;
            console.log($scope.Cities);
          });

        $scope.applyFilters = function() {
            console.log('distance', $scope.filterDistance);
            console.log('city', $scope.filterCity);
            console.log('stars', $scope.filterRating);
        };

        TrailService.getList().then(function(res) {
            console.log(res);

        });

    });
