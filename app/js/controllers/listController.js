/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, TrailService, CommuneService, WeatherService) {
        const TRAIL_PER_PAGES = 5;
        $scope.cities = [];
        $scope.filters = {};
        $scope.trails = [];
        $scope.top10 = [];

        function getCount(filters, trailsPerPages) {
            console.log('filters', filters);
            console.log('limit', trailsPerPages);

            TrailService.getCount(filters, trailsPerPages).then(function(res) {
                $scope.count = res.data;
                $scope.pages = [];
                for (var i = 0; i < $scope.count.pages; i++) {
                    $scope.pages.push(i);
                }
                console.log('Count', $scope.count);
            }, function(err) {
                console.error('Count error', err);
            });
        }

        function getList(filters, limit, pageOffset) {
            console.log('offset : ', pageOffset);
            TrailService.getList(filters, limit, TRAIL_PER_PAGES * pageOffset).then(function(res) {
                console.log('Result of trail query', res);
                $scope.trails = res.data.trails;
                getCount(filters, TRAIL_PER_PAGES); // TODO optimize this to only one call to the backend
            });
        }


        $scope.goToPage = function(pageNumber) {
            console.log('going to page', pageNumber);
            getList($scope.filters, TRAIL_PER_PAGES, pageNumber);
        };

        CommuneService.getAll().then(function(res) {
            $scope.cities = res.data;
            console.log('cities', $scope.cities);
        });

        TrailService.getTop10().then(function(res) {
            console.log('res top 10', res);
            $scope.top10 = res.data.trails;
        }, function(err) {
            console.error('err top 10', err);
        });

        getList($scope.filters, TRAIL_PER_PAGES, 0);

        $scope.consultWeather = function() {
            console.log($scope.cityWeather);
            WeatherService.getWeather($scope.cityWeather).then(function(res) {
                console.log('Weather', res);
                $scope.cityWeatherList = res.data.city.name;
                $scope.weather = res.data.list.filter(function(weather) {
                    return weather.dt_txt.substring(11) === '12:00:00';
                });
                console.log('weather filter', $scope.weather);
            }, function(err) {
                console.log('OpenWeatherMapError', err);
            });
        };
        $scope.changeDate = function(date) {
            date = date.substring(0, 10).split("-").reverse().join("-");
            return date;
        };


    });
