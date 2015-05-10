(function () {
    var e, o;
    e = ["underscore", "angular", "core/services/domainUtils", "core/services/timeUtils", "core/services/pageUtils", "background/module", "background/services/proxyManager", "background/services/conflictDetector", "background/services/userDomains", "background/services/upgradeManager", "background/services/tabsTracker"], o = function (e, o) {
        var badgeManager;
        return badgeManager = function ($rootScope, $timeout, domainUtils, timeUtils, pageUtils, proxyManager, conflictDetector, userDomains, upgradeManager, tabsTracker, MODES, ROLES) {
            var o, r, c;
            return o = function () {
                return $rootScope.$watch("conflicts", function () {
                    return c()
                }, !0), $rootScope.$watch("mode", function () {
                    return c()
                }), $rootScope.$watch("blocked", function () {
                    return c()
                }), $rootScope.$watch("domains", function () {
                    return c()
                }, !0), $rootScope.$watch("currentTab", function () {
                    return c()
                }, !0), $rootScope.$watch("user.role", c), $rootScope.$watch("expired", c), chrome.browserAction.onClicked.addListener(function () {
                    return $rootScope.user.role === ROLES.GUEST ? pageUtils.activateUrl("login.html#/?source=force-login") : $rootScope.user.role === ROLES.USER ? pageUtils.activateUrl("options.html") : $rootScope.expired ? pageUtils.activateUrl("upgrade.html") : void 0
                })
            }, r = null, c = e.throttle(function () {
                var e, o, c, n, i, s, a, u, l, d, p;
                if (i = "/img/icon-never.png", e = "/img/icon-always.png", o = "/img/icon-auto.png", n = "/img/icon-blocked.png", c = "/img/icon-auto-active.png", u = o, $rootScope.expired)chrome.browserAction.setBadgeBackgroundColor({color: "#F00"}), chrome.browserAction.setPopup({popup: ""}), chrome.browserAction.setBadgeText({text: "up"}), u = i; else if ($rootScope.conflicts.length > 0)chrome.browserAction.setBadgeBackgroundColor({color: "#F00"}), chrome.browserAction.setPopup({popup: "popup.html"}), chrome.browserAction.setBadgeText({text: "!"}), u = i; else if ($rootScope.user.role === ROLES.GUEST)chrome.browserAction.setBadgeBackgroundColor({color: "#17AD08"}), chrome.browserAction.setPopup({popup: ""}), chrome.browserAction.setBadgeText({text: "?"}), u = i; else if ((null != $rootScope && null != (p = $rootScope.user) ? p.role : void 0) === ROLES.USER)chrome.browserAction.setBadgeBackgroundColor({color: "#428BCA"}), chrome.browserAction.setPopup({popup: ""}), chrome.browserAction.setBadgeText({text: "$"}), u = i; else {
                    switch (chrome.browserAction.setBadgeBackgroundColor({color: "#000"}), chrome.browserAction.setPopup({popup: "popup.html"}), s = $rootScope.blockedDomains.length || 0, chrome.browserAction.setBadgeText({text: s > 0 ? s.toString() : ""}), l = $rootScope.currentTab, $rootScope.mode) {
                        case MODES.NEVER:
                            u = i;
                            break;
                        case MODES.ALWAYS:
                            u = e;
                            break;
                        default:
                            (null != l ? l.url : void 0) ? (d = l.url, a = domainUtils.parseUri(d).host, u = userDomains.match(a) ? c : o) : u = o
                    }
                    $rootScope.mode !== MODES.NEVER && $rootScope.blocked && (u = n)
                }
                return u !== r ? (chrome.browserAction.setIcon({path: u}), r = u) : void 0
            }, 300), o(), this
        }, o.module("background").service("badgeManager", badgeManager)
    }, define(e, o)
}).call(this);