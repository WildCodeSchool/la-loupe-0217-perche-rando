/*
* Service utilisé pour travailer les circuits de randonnés
*/
angular.module('app')
    .service('TrailService', function($http) {
        return {
            getList: function(filters) {
                console.log('filter', filters);
                return $http.get('/trails/', {
                    params: filters
                });
            },
            getOne: function(id) {
                return $http.get(`/trails/${id}`);
            },
            create: function(trail) {
                return $http.post('/trails/', trail);
            },
            delete: function(id) {
                return $http.put('/trails/' + id);
            },
            getAllByUser: function(userId) {
                // TODO à compléter
            },
        };
    });
