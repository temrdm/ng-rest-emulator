(function () {
    'use strict';

    angular
        .module('ngRestEmulator')
        .factory('restEmulatorHttpInterceptor', restEmulatorHttpInterceptor);

    function restEmulatorHttpInterceptor($restEmulatorConfig) {
        return {
            request: request
        };

        function getUpdatedQueryString(search, key, value) {
            var param = (key + '=' + value);
            return search.length && search[0] === '?' ? search + '&' + param : '?' + param;
        }

        function request(config) {
            var parser, presetName;

            parser = document.createElement('a');
            parser.href = config.url;

            presetName = $restEmulatorConfig.get(parser.pathname, config.method);
            if (presetName) {
                parser.search = getUpdatedQueryString(parser.search, 'restEmulatorPreset', presetName);
                config.url = parser.pathname + parser.search;
            }
            return config;
        }
    }
})();
