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

        // TrailService.getOne($scope.idTrail).then(function(res) {
        //     console.log(res);
        //     $scope.trail = res.data;
        //     console.log($scope.trail);
        //     NgMap.getMap().then(function(map) {
        //         console.log(map);
        //
        //         map.setCenter($scope.trail.center);
        //         map.setZoom($scope.trail.zoom);
        //     });
        //
        // }, function(err) {
        //     $scope.error.show = true;
        //     $scope.error.content = err.statusText;
        //     console.log(err);
        // });

        $scope.Ville = 'Chartres';
        WeatherService.getWeather($scope.Ville).then(function(res) {
            console.log(res);
            $scope.weather = res.data.list;
            console.log($scope.weather);

        }, function(err) {
            $scope.error.show = true;
            $scope.error.content = err.statusText;
            console.log('erreur', err);
        });
        $scope.changeDate = function(date) {
          date = date.substring(0,10).split("-").reverse().join("-");
          return date;
        };

    });
