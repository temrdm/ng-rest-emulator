(function () {
    'use strict';

    angular
        .module('App')
        .config(['$restEmulatorConfigProvider', function ($restEmulatorConfigProvider) {
            $restEmulatorConfigProvider.set('/api/v1/users', 'blank');
            $restEmulatorConfigProvider.set('/api/v1/cities', 'increase');
        }]);

})();
