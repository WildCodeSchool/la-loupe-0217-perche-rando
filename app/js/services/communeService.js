/*
 * Service utilisé pour travailer les commentaires d'un circuit
 */
angular.module('app')
    .service('CommuneService', function($http) {
        return {
            getAll: function() {
                return $http.get('/communes/');
            }
        };
    });
