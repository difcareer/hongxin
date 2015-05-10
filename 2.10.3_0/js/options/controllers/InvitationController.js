(function () {
    var n, i;
    n = ["angular", "options/module"], i = function (n) {
        var i;
        return i = function ($scope, $rootScope, $http, $timeout, invitationManager, SERVER) {
            var n;
            return $scope.inviter = "", $scope.tempInviter = "", $scope.showInviterInput = !1, $scope.focusInviterInput = !1, $scope.invitationList = null, $scope.invite_url = "", n = function () {
                return invitationManager.queryInviter(function (n) {
                    return $scope.inviter = n
                }), invitationManager.queryInvitationList(), $http({
                    method: "POST",
                    url: "https://" + SERVER + "/user/invite_url",
                    params: {sid: $rootScope.user.profile.sid}
                }).success(function (n) {
                    return n.url ? $scope.invite_url = n.url : void 0
                })
            }, $scope.isMe = function (n) {
                return n === $rootScope.user.profile.name
            }, $scope.fetchInvitationReward = function (n) {
                return $http({
                    method: "POST",
                    url: "https://" + SERVER + "/user/fetch_invitation_reward",
                    params: {sid: $rootScope.user.profile.sid, invitation_id: n._id}
                }).success(function () {
                    return n.can_fetch_reward = !1
                })
            }, n()
        }, n.module("options").controller("InvitationController", i)
    }, define(n, i)
}).call(this);