(function () {
    var r, n;
    r = ["angular", "core/module"], n = function (r) {
        var pageUtils, n;
        return n = function (r) {
            return -1 === r.indexOf("://") ? chrome.runtime.getURL(r) : r
        }, pageUtils = function () {
            return this.makeQueryString = function (r) {
                var n, e;
                return "?" + function () {
                        var u;
                        u = [];
                        for (n in r)e = r[n], u.push("" + n + "=" + e);
                        return u
                    }().join("&")
            }, this.openUrl = function (r, e) {
                return r = n(r), chrome.tabs.getSelected(null, function () {
                    return function (n) {
                        return chrome.tabs.create({url: r, index: n.index + 1}), "function" == typeof e ? e() : void 0
                    }
                }(this))
            }, this.activateUrl = function (r, e) {
                var u;
                return r = n(r), u = r.split("#")[0], chrome.tabs.query({
                    currentWindow: !0,
                    url: u + "*"
                }, function (n) {
                    return n && n.length > 0 ? void chrome.tabs.update(n[0].id, {url: r, highlighted: !0}, function () {
                        return "function" == typeof e ? e() : void 0
                    }) : chrome.tabs.getSelected(null, function (n) {
                        return chrome.tabs.create({url: r, index: n.index + 1}, function () {
                            return "function" == typeof e ? e() : void 0
                        })
                    })
                })
            }, this.closeUrl = function (r) {
                return r = n(r), chrome.tabs.query({url: r + "*"}, function () {
                    return function (r) {
                        var n;
                        return chrome.tabs.remove(function () {
                            var e, u, i;
                            for (i = [], e = 0, u = r.length; u > e; e++)n = r[e], i.push(n.id);
                            return i
                        }())
                    }
                }(this))
            }, this.redirectUrl = function (r) {
                return location.href = n(r)
            }, this.reloadCurrentTab = function (r) {
                return chrome.tabs.query({active: !0, currentWindow: !0}, function (n) {
                    var e, u, i, o;
                    for (o = [], u = 0, i = n.length; i > u; u++)e = n[u], o.push(chrome.tabs.update(e.id, {url: e.url}, function () {
                        return "function" == typeof r ? r() : void 0
                    }));
                    return o
                })
            }, window.pageUtils = this, this
        }, r.module("core").service("pageUtils", pageUtils)
    }, define(r, n)
}).call(this);