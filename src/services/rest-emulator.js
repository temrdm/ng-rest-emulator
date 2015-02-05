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

        function listPreset(){
            return mocks;
        }

        function get($window) {
            var $get = {
                set: setPreset,
                get: getPreset,
                list: listPreset
            };
            $window.restEmulator = $get;
            return $get;
        }
    }
})();
