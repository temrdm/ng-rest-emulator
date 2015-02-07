ng-rest-emulator
===========

# Dependency

Use ngRestEmulator with [gulp-rest-emulator](https://github.com/temrdm/gulp-rest-emulator) plugin.

# Installation

    bower install --save ng-rest-emulator

# Plugins

* [REST emulator](https://github.com/temrdm/rest-emulator)
* [Gulp plugin](https://github.com/temrdm/gulp-rest-emulator)

# Usage

## AngularJS

Add ngRestEmulator module: `angular.module('App', ['ngRestEmulator']);`

Add preset config:
```
    angular.module('App')
    .config(['$restEmulatorConfigProvider', function ($restEmulatorConfigProvider) {
        $restEmulatorConfigProvider.set('/api/v1/users', 'blank');
        $restEmulatorConfigProvider.set('/api/v1/cities', 'increase');
    }]);
```

## DevTools

Available methods at dev console:

```
    restEmulator.set(url, preset, [method]);
    restEmulator.get(url, [method]);
    restEmulator.clear(url, [method]);
    restEmulator.list();
```

# Mocks

[See info about mocks](https://github.com/temrdm/rest-emulator#mock)
