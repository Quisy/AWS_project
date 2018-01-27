import express from 'express';
import bodyParser from 'body-parser';


class Service {
    constructor(requestProcessors) {
        var self = this;
        this.app = express();
        this.app.use(bodyParser.urlencoded());
        this.app.use(bodyParser.json());

        var handlers = {};
        for (var i = 0; i < requestProcessors.length; i++) {
            var action = (typeof (requestProcessors[i].action) == "function" ? requestProcessors[i].action : self.sendFile(requestProcessors[i].action));
            handlers[requestProcessors[i].path] = (handlers[requestProcessors[i].path] ? self.chainActions(handlers[requestProcessors[i].path], action) : action);
        }

        Object.keys(handlers).forEach(function (key) {
            self.app.all(key, function (request, response) {
                console.log("request processing started");
                handlers[key](request, function (err, result, file) {
                    if (file) {
                        response.sendfile(file);
                    }
                    else if (err) {
                        response.send("an error occured " + err);
                    } else {
                        //response.send(result ? result : "");
                        response.render(result.template, result.params);
                    }
                    console.log("request processing finished");
                });
            });
        });
    }

    run(port) {
        this.app.listen(port);
    }

    sendFile(path) {
        return function (request, callback) {
            callback(null, null, path);
        }
    }

    chainActions(action1, action2) {
        return function (request, callback) {
            action1(request, function (err, result1, file) {
                if (err) { callback(err); return; }
                if (file) { callback(null, null, file); return; }
                action2(request, function (err, result2, file) {
                    if (err) { callback(err); return; }
                    if (file) { callback(null, null, file); return; }
                    callback(null, result1 + result2);
                });
            });
        }
    }

}

export default Service;