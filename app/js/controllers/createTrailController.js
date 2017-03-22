/*
 * Correspond à la création d'un circuit
 */
angular.module('app')
    .controller('CreateTrailController', function($scope, $stateParams, TrailService, NgMap) {
        $scope.error = {
            'content': '',
            'show': false
        };

        $scope.trail = {
            "zoom": 13,
            "name": "dsds",
            "center": {
                "lat": 48.4713,
                "lng": 1.0143
            }
        };

        $scope.setPath = function(event) {
            var latLngs = event.latLngs.b[0].b;
            console.log(latLngs);
            $scope.trail.nodes = [];
            latLngs.forEach(function(point) {
                $scope.trail.nodes.push([point.lat(), point.lng()]);
            });
        };


        $scope.createTrail = function() {
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
