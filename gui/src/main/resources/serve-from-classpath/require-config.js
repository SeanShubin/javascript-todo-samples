var require = {
    baseUrl: '.',
    paths: {
        'jquery': 'lib/jquery-2.1.1',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'qunit': 'lib/qunit-1.14.0',
        'sinon': 'lib/sinon-1.9.1',
        'q': 'lib/q'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'qunit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'sinon': {
            exports: 'sinon'
        },
        'q': {
            exports: 'Q'
        }
    }
};
