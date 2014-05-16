require(['lib/domReady!', 'bar/bar', 'jquery'], function (dom, bar, $) {
    'use strict';
    var body, $dom;
    $dom = $(dom);
    body = $dom.find('body');
    body.append('<h1>Foo!</h1>');
    bar(body)
});
