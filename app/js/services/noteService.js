angular.module('app')
    .service('NoteService', function($http) {
        return {
          update: function(userId, trailId, note) {
              return $http.post(`/notes/${userId}/on/${trailId}`, note);
          },
        };
    });
