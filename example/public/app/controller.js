(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', ['$http', function ($http) {
            var vm = this;

            vm.update = activate;

            activate();

            return vm;

            function activate() {
                $http
                    .get('/api/v1/users')
                    .then(successUsers);

                $http
                    .get('/api/v1/cities')
                    .then(successCities);

                $http
                    .get('/api/v1/regions')
                    .then(successRegions);
            }

            function successUsers(response) {
                vm.users = response.data;
            }

            function successCities(response) {
                vm.cities = response.data;
            }

            function successRegions(response) {
                vm.regions = response.data;
            }

        }]);
})();
