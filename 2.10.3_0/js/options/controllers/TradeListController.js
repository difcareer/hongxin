(function () {
    var n, r;
    n = ["angular", "options/module"], r = function (n) {
        var r;
        return r = function ($scope, $rootScope, $http, SERVER) {
            return $scope.trades = null, $scope.init = function () {
                return $http.get("https://" + SERVER + "/pay/list?sid=" + $rootScope.user.profile.sid).success(function (n) {
                    return n.trade_list ? $scope.trades = n.trade_list : void 0
                })
            }, $scope.init()
        }, n.module("options").controller("TradeListController", r)
    }, define(n, r)
}).call(this);