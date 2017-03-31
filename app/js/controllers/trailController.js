/*
 * Correspond à l'affichage d'un circuit
 */
angular.module('app')
    .controller('TrailController', function($scope, $stateParams, TrailService, NgMap, WeatherService, CommentService, CurrentUser) {
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
                $scope.weather = res.data.list.filter(function (weather) {
                  return weather.dt_txt.substring(11) === '12:00:00';
                });
                console.log('weather filter', $scope.weather);
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

        $scope.addComment = function() {
            console.log('newcomment', $scope.newComment);
            $scope.newComment.trail = $scope.idTrail;
            $scope.newComment.author = CurrentUser.user()._id;
            console.log('CurrentUser.user', CurrentUser.user()._id);

            CommentService.create($scope.newComment).then(function(res) {
                console.log('res comment', res);
                $scope.newComment.content = '';
                loadComments();
            }, function(err) {
                console.log('err new comment', err);
            });
        };

        function loadComments() {
            CommentService.getAllByTrailId($scope.idTrail).then(function(res) {
                console.log('listcomments', res);
                $scope.commentsList = res.data;
                console.log('res.data', res.data);
            });
        }
        loadComments();

        function toGmapsCenter(geoJSONPoint) {
            return {
                "lat": geoJSONPoint.coordinates[1],
                "lng": geoJSONPoint.coordinates[0]
            };
        }

        $scope.toGmapsCoordinates = function(geoJSONLineString) {
            console.log('geoJSONLineString', geoJSONLineString);
            return geoJSONLineString.coordinates.map(point => [point[1], point[0]]);
        };
    });
