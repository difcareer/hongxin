(function () {
    var e, r;
    e = ["debug", "angular", "core/services/domainUtils", "background/module", "background/services/proxyManager"], r = function (e, r) {
        var errorPageCustomizer, u;
        return u = e("errorPageCustomizer"), errorPageCustomizer = function ($rootScope, domainUtils, proxyManager, ROLES, ERROR_PAGE_PROXY) {
            var e, r, l, n, s, o, a;
            return a = {}, r = function () {
                return null == $rootScope.urlRules && ($rootScope.urlRules = {}), chrome.webRequest.onErrorOccurred.addListener(s, {
                    urls: ["<all_urls>"],
                    types: ["main_frame"]
                }), chrome.webRequest.onCompleted.addListener(n, {
                    urls: ["<all_urls>"],
                    types: ["main_frame"]
                }), chrome.webRequest.onBeforeSendHeaders.addListener(l, {urls: ["http://*/*"]}, ["blocking", "requestHeaders"]), u("ready")
            }, e = function (e, r) {
                var l;
                return l = domainUtils.parseUri(e), "http" === l.protocol ? (a[e] = r, $rootScope.urlRules[e] = ERROR_PAGE_PROXY, u("+ %s %s", r, e)) : void 0
            }, o = function (e) {
                return a[e] && delete a[e], $rootScope.urlRules[e] && delete $rootScope.urlRules[e], u("- %s", e)
            }, l = function (e) {
                var r, u;
                if (a[e.url] && (null != $rootScope && null != (r = $rootScope.user) && null != (u = r.profile) ? u.name : void 0))return e.requestHeaders.push({
                    name: "X-Error",
                    value: a[e.url]
                }), e.requestHeaders.push({
                    name: "X-name",
                    value: $rootScope.user.profile.name
                }), {requestHeaders: e.requestHeaders}
            }, s = function (r) {
                var l, n;
                if ((null != $rootScope && null != (l = $rootScope.user) ? l.role : void 0) === ROLES.USER && "net::ERR_BLOCKED_BY_CLIENT" !== (n = r.error) && "net::ERR_ABORTED" !== n)return u("error: %s %s", r.error, r), $rootScope.urlRules[r.url] ? o(r.url) : (e(r.url, r.error), setTimeout(function () {
                    return chrome.tabs.reload(r.tabId, {bypassCache: !0})
                }, 500)), $rootScope.$apply()
            }, n = function (e) {
                return $rootScope.urlRules[e.url] ? o(e.url) : void 0
            }, r(), this
        }, r.module("background").service("errorPageCustomizer", errorPageCustomizer)
    }, define(e, r)
}).call(this);