/*
 * Service utilisé pour travailer les commentaires d'un circuit
 */
angular.module('app')
    .service('CommentService', function($http) {
        return {
          create: function(comment) {
              return $http.post('/comments/', comment);
          },
          getAllByTrailId: function(idTrail) {
              return $http.get('/comments/byTrail/' + idTrail);
          }
        };
    });
