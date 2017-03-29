/*
 * Service utilisé pour travailer les commentaires d'un circuit
 */
angular.module('app')
    .service('CommentService', function($http) {
        return {
            create: function(comment) {
                return $http.post('http://localhost:3000/comments', comment);
            }
        };
    });
