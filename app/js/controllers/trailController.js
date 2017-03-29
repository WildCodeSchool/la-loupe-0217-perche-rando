/*
 * Correspond à l'affichage d'un circuit
 */
angular.module('app')
    .controller('TrailController', function($scope, $stateParams, TrailService, NgMap, WeatherService) {
        $scope.idTrail = $stateParams.id;
        $scope.error = {
            'content': '',
            'show': false
        };

        TrailService.getOne($scope.idTrail).then(function(res) {
            console.log('res1', res);
            $scope.trail = res.data;
            console.log($scope.trail);
            NgMap.getMap().then(function(map) {
                console.log(map);

                map.setCenter($scope.trail.center);
                map.setZoom($scope.trail.zoom);
            });
            $scope.Ville = res.data.commune;
            WeatherService.getWeather($scope.Ville).then(function(res) {
                console.log('res2', res);
                $scope.Weather = res.data.list;
                console.log('weather2', $scope.Weather);
            });

        }, function(err) {
            $scope.error.show = true;
            $scope.error.content = err.statusText;
            console.log(err);
        });
        $scope.changeDate = function(date) {
            date = date.substring(0, 10).split("-").reverse().join("-");
            return date;
        };

    });
