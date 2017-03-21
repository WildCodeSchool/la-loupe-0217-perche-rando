/*
* Service utilisé pour travailer les circuits de randonnés
*/
angular.module('app')
    .service('TrailService', function($http) {
        return {
            getAll: function() {
                return $http.get('/trails');
            },
            getOne: function(id) {
                return $http.get('/trails/' + id);
            },
            create: function(trail) {
                return $http.post('/trails/', trail);
            },
            delete: function(id) {
                return $http.put('/trails/' + id);
            },
            getAllByUser: function(userId) {
                // TODO à compléter
            }
        };
    });
