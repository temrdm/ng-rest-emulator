(function () {
    'use strict';

    angular
        .module('ngRestEmulator', []);
})();

(function () {
    'use strict';

    angular
        .module('ngRestEmulator')
        .provider('$restEmulatorConfig', restEmulatorConfig);

    function restEmulatorConfig() {
        var mocks = {};
        var provider = {
            $get: /*@ngInject*/get,
            set: setPreset
        };
        get.$inject = ['$window'];
        return provider;

        function setPreset(url, name, method) {
            method = method || 'GET';
            if (!mocks[url]) {
                mocks[url] = {};
            }
            mocks[url][method] = name;
        }

        function getPreset(url, method) {
            method = method || 'GET';
            return mocks[url] && mocks[url][method] ? mocks[url][method] : false;
        }

        function listPreset() {
            return mocks;
        }

        function clearPreset(url, method) {
            method = method || 'GET';
            if (mocks[url] && mocks[url][method]) {
                delete mocks[url][method];
                return true
            }
            return false;
        }

        function get($window) {
            var $get = {
                set: setPreset,
                get: getPreset,
                list: listPreset,
                clear: clearPreset
            };
            $window.restEmulator = $get;
            return $get;
        }
    }
})();

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

    restEmulatorHttpInterceptor.$inject = ['$restEmulatorConfig'];
})();

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

    config.$inject = ['$httpProvider'];
})();
