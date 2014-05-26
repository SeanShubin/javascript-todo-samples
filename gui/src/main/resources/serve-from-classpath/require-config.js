var require = {
    baseUrl: '.',
    paths: {
        'jquery': 'lib/jquery-2.1.1',
        'underscore': 'lib/underscore',
        'underscore.string': 'lib/underscore.string',
        'backbone': 'lib/backbone',
        'qunit': 'lib/qunit-1.14.0',
        'sinon': 'lib/sinon-1.10.0',
        'react': 'lib/react-with-addons-0.10.0',
        'superagent': 'lib/superagent-0.18.0',
        'q': 'lib/q',
        'text': 'lib/text'
    },
    shim: {
        'qunit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'sinon': {
            exports: 'sinon'
        }
    }
};
