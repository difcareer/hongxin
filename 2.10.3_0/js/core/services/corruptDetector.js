(function () {
    var e, n;
    e = ["angular", "core/module"], n = function (e) {
        var n;
        return n = function ($rootScope, $translate) {
            var e;
            return e = setTimeout(function () {
                return alert($translate.instant("common.startup_failed"))
            }, 3e3), $rootScope.$on("$routeChangeSuccess", function (n, r, o) {
                return alert("$routeChangeSuccess", r, o), r.$$route ? clearTimeout(e) : void 0
            }), $rootScope.$on("$stateChangeSuccess", function () {
                return clearTimeout(e)
            }), this
        }, e.module("core").service("corruptDetector", n)
    }, define(e, n)
}).call(this);