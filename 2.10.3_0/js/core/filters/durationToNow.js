(function () {
    var n, o;
    n = ["angular", "angular_translate", "core/module"], o = function (n) {
        var o;
        return o = function ($translate) {
            return function (t) {
                var n, o, r, a, e, u, i;
                return i = function (n, o) {
                    var r, a, e;
                    return null == o && (o = 2), r = o - String(n).length, 0 >= r ? n : (a = function () {
                        var n, o;
                        for (o = [], e = n = 0; r >= 0 ? r > n : n > r; e = r >= 0 ? ++n : --n)o.push("0");
                        return o
                    }(), a.concat(n).join(""))
                }, u = $translate.instant("options.layout.second"), a = $translate.instant("options.layout.minute"), r = $translate.instant("options.layout.hour"), o = $translate.instant("options.layout.day"), e = new Date, n = parseInt(t - e.getTime() / 1e3), 0 >= n ? "" : 60 >= n ? "" + n + u : 3600 >= n ? "" + i(parseInt(n / 60)) + a + i(n % 60) + u : 86400 >= n ? "" + i(parseInt(n / 3600)) + r + i(parseInt(n % 3600 / 60)) + a : (n / 3600 / 24).toFixed(1) + o
            }
        }, n.module("core").filter("durationToNow", o)
    }, define(n, o)
}).call(this);