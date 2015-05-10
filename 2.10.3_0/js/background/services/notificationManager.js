(function () {
    var n, i;
    n = ["angular", "core/services/storage", "core/services/pageUtils", "core/services/timeUtils", "background/module", "background/services/track"], i = function (n) {
        var notificationManager;
        return notificationManager = function ($rootScope, $translate, $http, $timeout, storage, server, timeUtils, pageUtils, track, ROLES, SERVER) {
            var n, i, e, o, r;
            return chrome.notifications ? (o = {}, i = function () {
                return server.on("fetch_notification", function (i) {
                    return n(null != i ? i.nid : void 0)
                }), $rootScope.$on("checkin-success", function () {
                    var i, e;
                    return (null != (i = $rootScope.user) && null != (e = i.profile) ? e.sid : void 0) ? $timeout(n, 30 * Math.random() * 1e3) : void 0
                }), chrome.notifications.onClicked.addListener(function (n) {
                    var i;
                    return (i = o[n]) ? (pageUtils.openUrl("options" === i.url ? "options.html" : i.url), track.event("notification", i.type, "click")) : void 0
                }), chrome.notifications.onButtonClicked.addListener(function (n, i) {
                    var e, r;
                    return (r = o[n]) ? (e = r.options.buttons[i].title, "Please Renew VIP" === r.type && storage.set("disableNotifyRenewVIP", !0), track.event("notification", r.type, "button-click:" + e)) : void 0
                }), server.on("profile", function () {
                    return setTimeout(function () {
                        var n, i, o;
                        if ((null != (n = $rootScope.user) ? n.role : void 0) === ROLES.USER) {
                            if (null != (i = $rootScope.user) && null != (o = i.profile) ? o.until : void 0) {
                                if (storage.get("disableNotifyRenewVIP"))return;
                                return r()
                            }
                            return e()
                        }
                    })
                })
            }, e = function () {
                var n, i, e;
                return n = {
                    options: {
                        title: $translate.instant("notifications.create_vip.title"),
                        message: $translate.instant("notifications.create_vip.message"),
                        contextMessage: $translate.instant("notifications.create_vip.contextMessage"),
                        type: "basic",
                        iconUrl: "img/logo.png"
                    },
                    type: "Please Create VIP",
                    url: "https://" + SERVER + "/pay/index?name=" + (null != (i = $rootScope.user) && null != (e = i.profile) ? e.name : void 0)
                }, chrome.notifications.create("notifyCreateVIP", n.options, function (i) {
                    return o[i] = n
                }), track.event("notification", n.type, "show")
            }, r = function () {
                var n, i, e;
                return n = {
                    options: {
                        title: $translate.instant("notifications.renew_vip.title"),
                        message: $translate.instant("notifications.renew_vip.message"),
                        contextMessage: $translate.instant("notifications.renew_vip.contextMessage"),
                        buttons: [{title: $translate.instant("notifications.renew_vip.button_title")}],
                        type: "basic",
                        iconUrl: "img/logo.png"
                    },
                    type: "Please Renew VIP",
                    url: "https://" + SERVER + "/pay/index?name=" + (null != (i = $rootScope.user) && null != (e = i.profile) ? e.name : void 0)
                }, chrome.notifications.create("notifyRenewVIP", n.options, function (i) {
                    return o[i] = n
                }), track.event("notification", n.type, "show")
            }, n = function (n) {
                var i, e;
                return null == n && (n = null), $http.get("https://" + SERVER + "/user/notification", {
                    params: {
                        sid: null != (i = $rootScope.user) && null != (e = i.profile) ? e.sid : void 0,
                        nid: n
                    }
                }).success(function (n) {
                    var i, e, r, s, a;
                    if (n.notifications) {
                        for (s = n.notifications, a = [], e = 0, r = s.length; r > e; e++)i = s[e], chrome.notifications.create("", i.option, function (n) {
                            return o[n] = i
                        }), a.push(track.event("notification", i.type, "show"));
                        return a
                    }
                })
            }, i(), this) : this
        }, n.module("background").service("notificationManager", notificationManager)
    }, define(n, i)
}).call(this);