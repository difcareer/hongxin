(function () {
    var e, r;
    e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "core/services/domainUtils", "background/module", "background/services/proxyManager"], r = function (e, r, n) {
        var a, performanceTracker;
        return a = r("performanceTracker"), performanceTracker = function ($rootScope, $timeout, $http, proxyManager, storage, timeUtils, domainUtils, ROLES, LOG_URL) {
            var r, i, o, s, d, u, l, c, m, p, f, y, h;
            return c = {}, l = {
                id: "",
                url: "",
                proxy: "",
                timeSendHeaders: -1,
                timeHeadersReceived: -1,
                timeEnded: -1,
                contentLength: 0,
                error: "",
                type: "latency"
            }, i = function () {
                return chrome.webRequest.onSendHeaders.addListener(u, {urls: ["<all_urls>"]}), chrome.webRequest.onHeadersReceived.addListener(d, {urls: ["<all_urls>"]}, ["responseHeaders"]), chrome.webRequest.onCompleted.addListener(o, {urls: ["<all_urls>"]}), chrome.webRequest.onErrorOccurred.addListener(s, {urls: ["<all_urls>"]}), p(), a("ready")
            }, m = function (e, r) {
                var n, a, i, o;
                o = [];
                for (a in r)i = r[a], n = {
                    event: "proxy." + a,
                    data: {sid: $rootScope.user.profile.sid, proxy: e}
                }, n.data[a] = i, o.push($http({method: "POST", url: LOG_URL, data: n}));
                return o
            }, r = function (e) {
                var r, n, i;
                if ("speed" === e.type) {
                    if (e.error ? i = 3 : (i = e.contentLength / 1e3 / (e.timeEnded - e.timeHeadersReceived), m(e.proxy, {speed: parseInt(i)})), n = proxyManager.getProxyByName(e.proxy), !n)return;
                    a("%s %s=%s", n.name, "speed", i), proxyManager.updateSpeed(n, i)
                } else {
                    if (e.error || (r = 1e3 * (e.timeHeadersReceived - e.timeSendHeaders), m(e.proxy, {latency: r})), n = proxyManager.getProxyByName(e.proxy), !n)return;
                    e.error ? (n.fail = Math.max(1, n.fail + 1), proxyManager.updateStability(n, 0)) : (n.fail = Math.min(-1, n.fail - 1), proxyManager.updateLatency(n, r), proxyManager.updateStability(n, 1)), a("%s %s=%s", n.name, "latency", r)
                }
                return delete c[e.id]
            }, u = function (e) {
                var r, a, i, o;
                return (a = e.url.indexOf("_HXPROXY_NAME=") > 0) ? (r = a && e.url.indexOf("bit_test") > 0, o = domainUtils.parseUri(e.url), i = n.copy(l), i.id = e.requestId, i.url = e.url, i.proxy = o.query._HXPROXY_NAME, i.timeSendHeaders = parseInt(e.timeStamp) / 1e3, i.type = r ? "speed" : "latency", c[e.requestId] = i) : void 0
            }, d = function (e) {
                var r, n, a, i, o, s;
                if (a = c[e.requestId]) {
                    for (r = 0, s = e.responseHeaders, i = 0, o = s.length; o > i; i++)if (n = s[i], "content-length" === n.name.toLowerCase()) {
                        r = parseInt(n.value);
                        break
                    }
                    return a.timeHeadersReceived = parseInt(e.timeStamp) / 1e3, a.contentLength = r
                }
            }, s = function (e) {
                var n;
                return n = c[e.requestId], n ? (n.timeEnded = parseInt(e.timeStamp) / 1e3, n.error = e.error, r(n)) : void 0
            }, o = function (e) {
                var n;
                return n = c[e.requestId], n ? (n.timeEnded = parseInt(e.timeStamp) / 1e3, r(n)) : void 0
            }, h = {speed: {queue: [], doing: !1}, latency: {queue: [], doing: !1}}, y = {}, f = function (e, r) {
                var n, a;
                if (a = h[r], !a.doing) {
                    if (n = {method: "GET"}, "latency" === r)n.url = "https://" + e.host + ":" + e.port + "/info?_=" + Math.random() + "&_HXPROXY_NAME=" + e.name + "&_HXPROXY=DIRECT", n.timeout = 5e3; else {
                        if ("speed" !== r)return;
                        n.url = "https://" + e.host + ":" + e.port + "/bit_test?size=500000&_HXPROXY_NAME=" + e.name + "&_=" + Math.random() + "&_HXPROXY=DIRECT", n.timeout = 6e4
                    }
                    return a.doing = !0, $http(n)["finally"](function () {
                        var n;
                        return a.doing = !1, null == y[n = e.name] && (y[n] = {}), y[e.name][r] = timeUtils.time()
                    })
                }
            }, p = e.once(function () {
                return function () {
                    var e;
                    return e = function () {
                        var e, r, n, a, i, o, s, d, u, l, c, m, p, h, v;
                        for (m = $rootScope.proxies, i = 0, d = m.length; d > i; i++)r = m[i], null == y[c = r.name] && (y[c] = {});
                        for (p = $rootScope.proxies, o = 0, u = p.length; u > o; o++)if (r = p[o], n = Math.abs(r.fail), e = Math.min(300, 10 + 300 * Math.pow(n / 5, 2)), (y[r.name].latency || 0) + e < timeUtils.time()) {
                            f(r, "latency");
                            break
                        }
                        for (a = $rootScope.user.role === ROLES.VIP ? 900 : 3600, h = $rootScope.proxies, v = [], s = 0, l = h.length; l > s; s++) {
                            if (r = h[s], r.speed < 0 || (y[r.name].speed || 0) + a < timeUtils.time()) {
                                f(r, "speed");
                                break
                            }
                            v.push(void 0)
                        }
                        return v
                    }, setTimeout(function () {
                        return setInterval(e, 1e3)
                    }, 5e3)
                }
            }(this)), i(), window.testTimes = y, this
        }, n.module("background").service("performanceTracker", performanceTracker)
    }, define(e, r)
}).call(this);