(function () {
    var n, e;
    n = ["underscore", "angular", "lang", "core/services/tele", "core/services/corruptDetector", "popup/module", "popup/controllers/ConflictController", "popup/controllers/MenuController", "angular_translate"], e = function (n, e, o) {
        return e.module("popup").config(function ($compileProvider, $routeProvider, $translateProvider) {
            return $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome):/), $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|data|ftp|mailto|chrome):/), $routeProvider.when("/menu", {
                templateUrl: "/partials/popup/menu.html",
                controller: "MenuController",
                resolve: {
                    popupMenuData: function (tele) {
                        return tele.run("popupMenuData")
                    }
                }
            }).when("/conflict", {
                templateUrl: "/partials/popup/conflicts.html",
                controller: "ConflictController"
            }).otherwise({redirectTo: "/menu"}), o.config($translateProvider)
        }).run(function ($location, $rootScope, $timeout, tele) {
            return $timeout(function () {
                return tele.run("track.pv", "/chrome-extension/popup")
            }, 500), $timeout(function () {
                return tele.scope("conflicts")
            }, 500), $rootScope.$watch("conflicts", function (n) {
                return (null != n ? n.length : void 0) > 0 && "/conflict" !== $location.path() ? $location.path("/conflict") : "/conflict" === $location.path() ? $location.path("/menu") : void 0
            }, !0)
        }), e.element(document).ready(function () {
            return e.bootstrap(document, ["popup"])
        })
    }, require(["../config"], function () {
        return requireWithRetry(n, e)
    })
}).call(this);