/*
 * Service utilisé pour travailer les circuits de randonnés
 */
angular.module('app')
    .service('TrailService', function($http) {
        return {
            getList: function(filters, limit, offset) {
                filters = JSON.parse(JSON.stringify(filters)); // Copies the filters object. Otherwise the getCount method ends up sending the wrong params
                if (limit !== undefined) {
                    filters.limit = limit;
                }
                if (offset !== undefined) {
                    filters.offset = offset;
                }
                return $http.get('/trails/', {
                    params: filters
                });
            },
            getCount: function(filters, trailsPerPages) {
                return $http.get(`/trails/count/${trailsPerPages}`, {
                    params: filters
                });
            },
            getTop10: function() {
                return $http.get(`/trails/top10/`);
            },
            getOne: function(id) {
                return $http.get(`/trails/${id}`);
            },
            create: function(trail) {
                return $http.post('/trails/', trail);
            },
            delete: function(id) {
                return $http.delete(`/trails/${id}`);
            },
            getAllByUser: function(userId) {
                // TODO à compléter
            },
        };
    });
