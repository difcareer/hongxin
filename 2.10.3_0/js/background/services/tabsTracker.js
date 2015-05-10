(function () {
    var r, e;
    r = ["underscore", "debug", "angular", "core/services/timeUtils", "core/services/domainUtils", "background/module", "background/services/userDomains"], e = function (r, e, n) {
        var u, tabsTracker;
        return u = e("tabsTracker"), tabsTracker = function ($rootScope, $timeout, timeUtils, domainUtils, userDomains) {
            var e, o, i, a, s, c, d, l, f, m, b, h, v, I, T, p;
            return o = 1e4, e = {
                id: null,
                url: "",
                domains: {},
                requestTimers: {}
            }, I = {}, T = r.throttle(function () {
                return setTimeout(function () {
                    return $rootScope.$apply()
                })
            }, 300), a = function () {
                return $rootScope.currentTabId = -1, $rootScope.currentTab = {}, $rootScope.blockedDomains = [], chrome.webRequest.onBeforeRequest.addListener(s, {urls: ["<all_urls>"]}), chrome.webRequest.onErrorOccurred.addListener(l, {urls: ["<all_urls>"]}), chrome.webRequest.onCompleted.addListener(d, {urls: ["<all_urls>"]}), chrome.tabs.onRemoved.addListener(m), chrome.tabs.onActivated.addListener(f), chrome.windows.onFocusChanged.addListener(b), chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (r) {
                    return 0 !== (r || []).length ? ($rootScope.currentTabId = r[0].id, T()) : void 0
                }), $rootScope.$watch("currentTabId", function (r) {
                    var e;
                    return e = i(r), $rootScope.currentTab = e
                }), $rootScope.$watch("currentTab.domains", c, !0)
            }, i = function (r) {
                var o;
                if (!(0 > r))return o = I[r], o || (o = n.copy(e), o.id = r, I[r] = o), o.url && o.favIconUrl || setTimeout(function () {
                    return chrome.tabs.get(r, function (e) {
                        return e ? ((null != e ? e.url : void 0) && (o.url = e.url), (null != e ? e.favIconUrl : void 0) && (o.favIconUrl = e.favIconUrl), u("tabInfo", r, e.url, e.favIconUrl), T()) : void 0
                    })
                }), o
            }, p = function (r, e, n, u) {
                var o, a, s, c;
                return o = i(r), (a = o.requestTimers[e]) ? (clearTimeout(a), delete o.requestTimers[e], null == (s = o.domains)[n] && (s[n] = {}), null == (c = o.domains[n])[u] && (c[u] = 0), o.domains[n][u] += 1, o) : void 0
            }, h = function (r) {
                return v(r), delete I[r]
            }, v = function (r) {
                var e, n, u, o;
                if (e = i(r)) {
                    u = e.requestTimers;
                    for (o in u)n = u[o], clearTimeout(n);
                    return e.domains = {}
                }
            }, s = function (r) {
                var e, n, u;
                if (!(r.tabId < 0 || "other" === r.type) && "https://www.googleapis.com/rpc" !== r.url)return e = domainUtils.parseUri(r.url).host, "main_frame" === r.type ? (v(r.tabId), u = i(r.tabId), u.url = r.url, u.favIconUrl = "") : u = i(r.tabId), n = setTimeout(function () {
                    return p(r.tabId, r.requestId, e, "timeout"), T()
                }, o), u.requestTimers[r.requestId] = n, T()
            }, l = function (r) {
                var e, n, u;
                if (!(r.tabId < 0 || "other" === r.type))return e = domainUtils.parseUri(r.url).host, n = "blocked", ("net::ERR_BLOCKED_BY_CLIENT" === (u = r.error) || "net::ERR_ABORTED" === u) && (n = "ok"), p(r.tabId, r.requestId, e, n), T()
            }, d = function (r) {
                var e, n;
                if (!(r.tabId < 0 || "other" === r.type))return e = domainUtils.parseUri(r.url).host, n = "ok", 403 === r.status && (n = "blocked"), p(r.tabId, r.requestId, e, n), T()
            }, m = function (r) {
                return h(r), T()
            }, f = function (r) {
                var e;
                return e = i(r.tabId), $rootScope.currentTab = e, T()
            }, b = function (r) {
                return chrome.tabs.query({active: !0, windowId: r, currentWindow: !0}, function () {
                    return function (r) {
                        var e;
                        if (r && 0 !== r.length)return e = i(r[0].id), $rootScope.currentTab = e, T()
                    }
                }(this))
            }, c = function (r) {
                var e, n, u, o, i, a, s, c, d, l, f, m;
                n = {};
                for (e in r)c = r[e], i = c.ok || 0, u = (c.timeout || 0) + (c.blocked || 0), s = i > u ? "ok" : "error", l = domainUtils.topDomain(e), null == n[l] && (n[l] = {}), n[l][e] = s;
                a = [];
                for (l in n) {
                    d = n[l], u = 0, i = 0, o = [];
                    for (e in d)s = d[e], "error" === s ? (u += 1, o.push(e)) : i += 1;
                    if (!userDomains.match(l))if (0 === i)a.push(l); else if (u >= i)a.push(l); else if (u >= 2)a.push(l); else for (f = 0, m = o.length; m > f; f++)e = o[f], userDomains.match(e) || a.push(e)
                }
                return $rootScope.blockedDomains = a
            }, a(), window.tabsMap = I, this
        }, n.module("background").service("tabsTracker", tabsTracker)
    }, define(r, e)
}).call(this);