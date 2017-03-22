/*
 * Correspond à l'affichage d'un circuit
 */
angular.module('app')
    .controller('TrailController', function($scope, $stateParams, TrailService, NgMap) {
        $scope.idTrail = $stateParams.id;
        $scope.error = {
            'content': '',
            'show': false
        };

        $scope.getPath = function() {
            return $scope.trail.nodes.map( node => [node.lat, node.lng] );
        };

        TrailService.getOne($scope.idTrail).then(function(res) {
            console.log(res);
            $scope.trail = res.data;
            NgMap.getMap().then(function(map) {
                console.log(map);

                map.setCenter($scope.trail.center);
                map.setZoom($scope.trail.zoom);
            });
        }, function(err) {
            $scope.error.show = true;
            $scope.error.content = err.statusText3;
            console.log(err);
        });


    });
