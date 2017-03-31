/*
 * Correspond à la création d'un circuit
 */
angular.module('app')
    .controller('CreateTrailController', function($scope, $stateParams, TrailService, NgMap) {
        $scope.error = {
            'content': '',
            'show': false
        };
        $scope.commune = "";

        $scope.trail = {
            zoom: 13 // TODO rendre le zoom dynamique ?
        };

        // TODO if this is not the first path to have ben drawn, delete the previous ones
        $scope.setPath = function(event) {
            var latLngs = event.latLngs.b[0].b;
            $scope.trail.nodes = [];
            latLngs.forEach(function(point) {
                $scope.trail.nodes.push([point.lat(), point.lng()]);
            });
            console.log($scope.trail.nodes);
        };

        $scope.createTrail = function() {
            $scope.trail.commune = $scope.commune;
            // TODO check that the trail has been created
            TrailService.create($scope.trail).then(function(res) {
                console.log("Trail créée", res);
            }, function(err) {
                $scope.error.show = true;
                $scope.error.content = err.statusText;
                console.log(err);
            });
        };
    });
