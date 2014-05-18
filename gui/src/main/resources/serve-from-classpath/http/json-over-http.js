define(['q'], function (Q) {
    'use strict';
    return function (options) {
        var uri, method, body, client, deferred;
        uri = options.uri;
        method = options.method;
        body = JSON.stringify(options.body);
        deferred = Q.defer();
        function handler() {
            var valueForDeferred;
            if (this.readyState === this.DONE) {
                if (this.response === '') {
                    valueForDeferred = {
                        status: this.status
                    };
                } else {
                    valueForDeferred = {
                        status: this.status,
                        body: JSON.parse(this.response)
                    };
                }
                deferred.resolve(valueForDeferred);
            }
        }

        client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open(method, uri);
        client.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        client.send(body);
        return deferred.promise;
    };
});
