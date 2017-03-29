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
            $scope.trail = res.data;
            console.log(res.data);
            NgMap.getMap().then(function(map) {
                map.setCenter(toGmapsCenter($scope.trail.center));
                map.setZoom($scope.trail.zoom);
            });
            $scope.Ville = res.data.commune;
            WeatherService.getWeather($scope.Ville.name).then(function(res) {
                console.log('Weather', res);
                $scope.weather = res.data.list;
            }, function(err) {
                console.log('OpenWeatherMapError', err);
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

        function toGmapsCenter(geoJSONPoint) {
            return {
                "lat": geoJSONPoint.coordinates[1],
                "lng": geoJSONPoint.coordinates[0]
            };
        }

        $scope.toGmapsCoordinates = function(geoJSONLineString) {
            return geoJSONLineString.coordinates.map(point => [point[1], point[0]]);
        };
    });
