(function () {
    'use strict';

    angular
        .module('ngRestEmulator')
        .config(config);

    function config($httpProvider) {
        $httpProvider
            .interceptors
            .push('restEmulatorHttpInterceptor');
    }
})();
