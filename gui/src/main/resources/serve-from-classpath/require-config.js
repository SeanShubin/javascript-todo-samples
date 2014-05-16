var require = {
    baseUrl: '.',
    paths: {
        'jquery': 'lib/jquery-2.1.1',
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'qunit': 'lib/qunit-1.14.0'
    },
    shim: {
        'qunit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
};
