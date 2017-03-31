/*
 * Service utilisé pour interagir avec OpenWeatherMap
 */
angular.module('app')
    .service('WeatherService', function($http) {
        return {
          getWeather: function (City) {
            return $http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${City}&lang=fr&units=metric&APPID=a59c2729aa50f4e50a18170f3ac6814d`);
          }
        };
    });
