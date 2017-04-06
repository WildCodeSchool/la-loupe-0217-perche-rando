/*
 * Correspond à l'affichage d'un circuit
 */
angular.module('app')
    .controller('TrailController', function($scope, $state, $stateParams, $location, TrailService, NgMap, NoteService, WeatherService, CommentService, CurrentUser, Auth) {
        $scope.url = $location.absUrl();
        console.log($scope.url);
        $scope.auth = Auth;
        $scope.idTrail = $stateParams.id;
        $scope.error = {
            'content': '',
            'show': false
        };
        $scope.rating = 3;
        $scope.user = CurrentUser.user();

        TrailService.getOne($scope.idTrail).then(function(res) {
                $scope.trail = res.data;
                console.log('res.data', res.data);
                NgMap.getMap().then(function(map) {
                    map.setCenter(toGmapsCenter($scope.trail.center));
                    map.setZoom($scope.trail.zoom);
                });

                $scope.Ville = res.data.commune;
                WeatherService.getWeather($scope.Ville.name).then(function(res) {
                    console.log('Weather', res);
                    $scope.weather = res.data.list.filter(function(weather) {
                        return weather.dt_txt.substring(11) === '12:00:00';
                    });
                    console.log('weather filter', $scope.weather);
                }, function(err) {
                    console.log('OpenWeatherMapError', err);
                });

                NoteService.getAverage($scope.idTrail).then(function(res) {
                    $scope.average = res.data.average;
                    console.log('Average rating of trail', $scope.average);
                }, function(err) {
                    console.error('Erreur average', err);
                });
            },
            function(err) {
                $scope.error.show = true;
                $scope.error.content = err.statusText;
                console.log(err);
            });

        $scope.changeDate = function(date) {
            date = date.substring(0, 10).split("-").reverse().join("-");
            return date;
        };

        $scope.time = function(trail) {
            time = trail.distance.toFixed(2) / 3;
            return `${Math.floor(time)} h ${((time % 1) * 60).toFixed(0)} mn`;
        };

        $scope.updateRating = function(rating) {
            console.log("Updating rating ...");
            NoteService.update(CurrentUser.user()._id, $scope.idTrail, {note:rating}).then(function(res) {
                console.log('The user voted', res.data);
            }, function(err){
                console.error('Erreur Note', err);
            });
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
            // console.log('geoJSONLineString', geoJSONLineString);
            return geoJSONLineString.coordinates.map(point => [point[1], point[0]]);
        };

        $scope.deleteTrail = function(id) {
            TrailService.delete(id).then(function(res) {
                console.log('Res deletion:', res);
                $state.go('user.list-trail', {"message": `Le circuit "${$scope.trail.commune.name} - ${$scope.trail.distance.toFixed(2)}km" a bien été supprimé`});
            }, function(err) {
                console.error('Err deletion', err);
            });
        };

        $scope.isAuthor = function() {
            return $scope.trail.author._id === $scope.user._id;
        };
    });
