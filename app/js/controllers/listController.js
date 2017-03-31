/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, CommuneService) {
        $scope.Cities = [];
        CommuneService.getAll().then(function(res) {
            $scope.Cities = res.data;
            console.log('cities', $scope.Cities);
            console.log('res commune', res);
          });

        // $scope.applyFilters = function() {
        //     console.log('distance', $scope.filterDistance);
        //     console.log('city', $scope.filterCity);
        //     console.log('stars', $scope.filterRating);
        //
        //     let id = $scope.filterCity;
        //     $scope.filters = [];
        //     console.log(id);
        //     $scope.filter.push($scope.cities);
        // };
    });
