/*
 * Correspond à la création d'un circuit
 */
angular.module('app')
    .controller('CreateTrailController', function($scope, $stateParams, CurrentUser, TrailService, NgMap) {
        $scope.error = {
            'content': '',
            'show': false
        };
        $scope.commune = "";

        $scope.trail = {
            zoom: 13 // TODO rendre le zoom dynamique ?
        };

        $scope.trailCreated = {};

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
            $scope.trail.author = CurrentUser.user()._id;
            // TODO check that the trail has been created
            TrailService.create($scope.trail).then(function(res) {
                console.log("Trail créée", res);
                $scope.trailCreated = res.data.created;
            }, function(err) {
                $scope.error.show = true;
                $scope.error.content = err.statusText;
                console.log(err);
            });
        };
    });
