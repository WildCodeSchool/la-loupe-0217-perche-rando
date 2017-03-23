/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, TrailService) {
$scope.applyFilters = function () {
  console.log('distance', $scope.filterDistance);
  console.log('city', $scope.filterCity);
};

$scope.Cities = ['La Loupe', 'Margon', 'Courcerault', 'Brunelles', 'Condé-sur-Huisne', 'Saint-Maurice-Saint-Germain'];

    });
