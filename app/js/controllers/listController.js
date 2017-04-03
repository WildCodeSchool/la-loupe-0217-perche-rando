/*
 * Correspond à la liste des circuits
 */
angular.module('app')
    .controller('ListController', function($scope, TrailService, CommuneService) {
        const TRAIL_PER_PAGES = 10;
        $scope.cities = [];
        $scope.filters = {};
        $scope.trails = [];

        function getCount(filters, trailsPerPages) {
            console.log('filters',filters);
            console.log('limit',trailsPerPages);

            TrailService.getCount(filters, trailsPerPages).then(function(res){
                $scope.count = res.data;
                $scope.pages = [];
                for(var i = 0; i < $scope.count.pages; i++) {
                    $scope.pages.push(i);
                }
                console.log($scope.count);
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

          getList($scope.filters, TRAIL_PER_PAGES, 0);
    });
