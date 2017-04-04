angular.module('app')
    .service('NoteService', function($http) {
        return {
          update: function(userId, trailId, note) {
              return $http.post(`/notes/on/${trailId}/by/${userId}/`, note);
          },
          getAverage: function(trailId) {
              return $http.get(`/notes/average/${trailId}`);
          },
        };
    });
