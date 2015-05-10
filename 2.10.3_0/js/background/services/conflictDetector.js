(function () {
    var n, e, r = [].indexOf || function (n) {
            for (var e = 0, r = this.length; r > e; e++)if (e in this && this[e] === n)return e;
            return -1
        };
    n = ["underscore", "debug", "angular", "background/module"], e = function (n, e, o) {
        var conflictDetector, i;
        return i = e("conflictDetector"), conflictDetector = function ($rootScope) {
            var e;
            return $rootScope.conflicts = [], e = function () {
                return chrome.proxy.settings.get({}, function (e) {
                    return "controlled_by_other_extensions" === (null != e ? e.levelOfControl : void 0) ? chrome.management.getAll(function (e) {
                        var o, i, c, l;
                        for (i = [], c = 0, l = e.length; l > c; c++)o = e[c], o.enabled && r.call(o.permissions, "proxy") >= 0 && o.id !== chrome.runtime.id && i.push({
                            id: o.id,
                            name: o.name,
                            iconUrl: o.icons[0].url
                        });
                        return n.sortBy(i, function (n) {
                            return n.id
                        }), $rootScope.conflicts = i
                    }) : $rootScope.conflicts = [], $rootScope.$apply()
                })
            }, setInterval(e, 1e3), i("ready"), this
        }, o.module("background").service("conflictDetector", conflictDetector)
    }, define(n, e)
}).call(this);