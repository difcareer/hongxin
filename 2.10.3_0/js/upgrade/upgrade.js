(function () {
    var n, r;
    n = ["underscore", "angular", "lang", "core/services/tele", "upgrade/module", "angular_translate"], r = function (n, r, e) {
        return r.module("upgrade").config(function ($translateProvider) {
            return e.config($translateProvider)
        }).run(function ($location, $rootScope, $timeout, tele) {
            return $timeout(function () {
                return tele.run("track.pv", "/chrome-extension/upgrade")
            }, 500)
        }), r.element(document).ready(function () {
            return r.bootstrap(document, ["upgrade"])
        })
    }, require(["../config"], function () {
        return requireWithRetry(n, r)
    })
}).call(this);