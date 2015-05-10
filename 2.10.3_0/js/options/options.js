(function () {
    var e, o;
    e = ["underscore", "debug", "angular", "lang", "angular_translate", "core/module", "core/filters/durationToNow", "core/directives/domain", "core/directives/equals", "core/directives/focusBind", "core/directives/formState", "core/directives/inviterInput", "core/directives/resizeIframe", "core/services/invitationManager", "core/services/corruptDetector", "options/controllers/OptionsPageController", "options/controllers/TradeListController", "options/controllers/DomainListController", "options/controllers/InvitationController", "options/controllers/ProfileController", "options/controllers/ChangePasswordController", "options/controllers/ChangePasswordModalController"], o = function (e, o, r, n) {
        var i;
        return i = o("options"), r.module("options").run(function ($templateCache) {
            var e;
            return i("run"), e = '<ul tabindex="-1" class="dropdown-menu" role="menu">\n    <li role="presentation" ng-class="{divider: item.divider}" ng-repeat="item in content">\n        <a role="menuitem" tabindex="-1" ng-href="{{item.href}}" ng-if="!item.divider && item.href" ng-bind="item.text"></a>\n        <a role="menuitem" tabindex="-1" href="" ng-if="!item.divider && item.click" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a>\n    </li>\n</ul>', $templateCache.put("dropdown/safeDropdown.tpl.html", e)
        }).config(function ($compileProvider, $stateProvider, $urlRouterProvider, $dropdownProvider, $translateProvider) {
            return $compileProvider.aHrefSanitizationWhitelist(/^\s*(http|https?|ftp|mailto|chrome-extension):/), $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|data|chrome-extension):/), r.extend($dropdownProvider.defaults, {template: "dropdown/safeDropdown.tpl.html"}), $urlRouterProvider.when("/", "/domains"), $stateProvider.state("main", {
                url: "/",
                templateUrl: "/partials/options/layout.html",
                controller: "OptionsPageController",
                resolve: {
                    user: function (tele) {
                        return tele.scope("user")
                    }, averageStability: function (tele) {
                        return tele.scope("averageStability")
                    }
                }
            }).state("main.trades", {
                url: "trades",
                templateUrl: "/partials/options/trade_list.html",
                controller: "TradeListController"
            }).state("main.domains", {
                url: "domains",
                templateUrl: "/partials/options/domain_list.html",
                controller: "DomainListController"
            }).state("main.invitations", {
                url: "invitations",
                templateUrl: "/partials/options/invitation.html",
                controller: "InvitationController"
            }).state("main.blog", {
                url: "blog",
                templateUrl: "/partials/options/blog.html"
            }), $urlRouterProvider.otherwise("domains"), n.config($translateProvider)
        }), r.element(document).ready(function () {
            return r.bootstrap(document, ["options"])
        })
    }, require(["../config"], function () {
        return requireWithRetry(e, o)
    })
}).call(this);