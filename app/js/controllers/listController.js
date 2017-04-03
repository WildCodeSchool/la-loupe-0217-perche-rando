/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, TrailService) {
        $scope.cities = [];
        $scope.filters = {};

        $scope.applyFilters = function() {
            TrailService.getList($scope.filters).then(function(res) {
                console.log('Result of query', res);
            });
        };
    });
