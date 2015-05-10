(function () {
    var r, e;
    r = ["angular", "angular_translate", "core/module", "core/services/validate", "core/services/invitationManager"], e = function (r) {
        var e;
        return e = function ($rootScope, $http, $timeout, $tooltip, $translate, invitationManager, validate, SERVER) {
            return {
                restrict: "E",
                scope: {focusTrigger: "=manualFocus"},
                templateUrl: "partials/options/_inviter_input.html",
                link: function (r, e) {
                    return r.tooltipText = "", r.tempInviter = "", r.$watch("focusTrigger", function (n) {
                        var i;
                        return n === !0 ? (i = e.children("form").children("input"), i[0].focus(), i[0].select(), r.focusTrigger = !1) : void 0
                    }), r.tooltipAlert = function (n) {
                        var i;
                        return i = e.children("form").children("input"), r.myTooltip = $tooltip(i, {
                            title: n,
                            placement: "bottom",
                            trigger: "manual"
                        }), $timeout(function () {
                            return r.myTooltip.show()
                        }, 1), $timeout(function () {
                            return r.myTooltip.hide()
                        }, 3e3)
                    }, r.setInviter = function () {
                        var e;
                        return e = r.tempInviter.trim(), validate.email(e) || validate.phone(e) ? $http({
                            method: "POST",
                            url: "https://" + SERVER + "/user/set_inviter",
                            params: {inviter: e, sid: $rootScope.user.profile.sid},
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}
                        }).success(function (n) {
                            return n.success ? ($rootScope.user.inviter = e, invitationManager.queryInviter(function (e) {
                                return r.$parent.inviter = e
                            }), r.$parent.showInviterInput = !1) : r.tooltipAlert(n.error)
                        }) : r.tooltipAlert($translate.instant("options.invitation.account_not_correct"))
                    }
                }
            }
        }, r.module("core").directive("inviterInput", e)
    }, define(r, e)
}).call(this);