(function () {
    var n, e;
    n = ["angular", "core/services/pageUtils", "core/services/domainUtils", "core/services/tele", "core/filters/durationToNow", "popup/module"], e = function (n) {
        var e;
        return e = function ($scope, $rootScope, $location, $translate, pageUtils, domainUtils, tele, SERVER, popupMenuData) {
            var n, e, o, r, u, a, i, c, s, l, d, m;
            return l = function () {
                return $scope.blockDomains = [], $scope.currentDomain = "", $scope.currentFavIconUrl = "", $scope.currentDomainIsAdded = "no", $scope.state = "normal", $scope.openOptionsPage = i, $scope.openFiltersPage = u, $scope.openInvitesPage = a, $scope.openPayPage = c, $scope.switchMode = m, $scope.addDomain = n, $scope.removeDomain = s, $scope.addSelectedDomains = e, $scope.showModeTips = d
            }, r = function () {
                var n;
                return l(), tele.scope("mode"), $rootScope.mode = popupMenuData.mode, tele.scope("currentTab"), $rootScope.currentTab = popupMenuData.currentTab, $rootScope.$watch("currentTab", function (n) {
                    return $scope.currentDomain = o(n), $scope.currentFavIconUrl = null != n ? n.favIconUrl : void 0
                }, !0), tele.scope("blockedDomains"), $rootScope.blockedDomains = popupMenuData.blockedDomains, tele.scope("user"), $rootScope.user = popupMenuData.user, $scope.blockedDomains = function () {
                    var e, o, r, u;
                    for (r = $rootScope.blockedDomains, u = [], e = 0, o = r.length; o > e; e++)n = r[e], u.push({
                        name: n,
                        selected: !0
                    });
                    return u
                }(), $scope.$watch("currentDomain", function (n) {
                    return tele.run("userDomains.match", n).then(function (n) {
                        return n ? $scope.currentDomainIsAdded = "yes" : void 0
                    })
                }), $scope.state = $scope.blockedDomains.length > 0 ? "blocked" : "normal"
            }, o = function (n) {
                var e;
                if (null != n ? n.url : void 0)return e = domainUtils.parseUri(n.url).host, domainUtils.topDomain(e)
            }, i = function () {
                return pageUtils.activateUrl("options.html", window.close)
            }, u = function () {
                return pageUtils.activateUrl("options.html#/domains?add=" + $scope.currentDomain, window.close)
            }, a = function () {
                return pageUtils.activateUrl("options.html#/invitations", window.close)
            }, c = function () {
                var n, e, o;
                return n = "https://" + SERVER + "/pay/index?name=" + (null != $rootScope && null != (e = $rootScope.user) && null != (o = e.profile) ? o.name : void 0), pageUtils.activateUrl(n, window.close)
            }, m = function (n) {
                return n !== $rootScope.mode && ($rootScope.mode = n), !1
            }, n = function (n) {
                return tele.run("userDomains.add", n).then(function () {
                    return pageUtils.reloadCurrentTab(window.close)
                })
            }, s = function (n) {
                return tele.run("userDomains.remove", n).then(function () {
                    return pageUtils.reloadCurrentTab(window.close)
                })
            }, e = function () {
                var n, e, o, r;
                for (e = _.pluck(_.where($scope.blockedDomains, {selected: !0}), "name"), o = 0, r = e.length; r > o; o++)n = e[o], tele.run("userDomains.add", n);
                return setTimeout(function () {
                    return pageUtils.reloadCurrentTab(window.close)
                }, 500)
            }, d = function (n) {
                return $scope.tips = "auto" === n ? $translate.instant("popup.menu.auto.desc") : "always" === n ? $translate.instant("popup.menu.always.desc") : "never" === n ? $translate.instant("popup.menu.never.desc") : ""
            }, r()
        }, n.module("popup").controller("MenuController", e)
    }, define(n, e)
}).call(this);