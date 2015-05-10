(function () {
    var i, n;
    i = ["angular", "core/module"], n = function (i) {
        var invitationManager;
        return invitationManager = function ($window, $rootScope, $http, $timeout, SERVER) {
            var i;
            return this.queryInvitationList = function () {
                return $http.get("https://" + SERVER + "/user/invitation_list?sid=" + $rootScope.user.profile.sid).success(function (i) {
                    return i.invitation_list ? $rootScope.invitationList = i.invitation_list : void 0
                })
            }, i = "", this.queryInviter = function (n) {
                var r;
                return i ? $timeout(function () {
                    return n(i)
                }) : (r = "https://" + SERVER + "/user/get_inviter?sid=" + $rootScope.user.profile.sid, $http.get(r).success(function (r) {
                    return i = r.inviter, n(i)
                }))
            }, this
        }, i.module("core").service("invitationManager", invitationManager)
    }, define(i, n)
}).call(this);