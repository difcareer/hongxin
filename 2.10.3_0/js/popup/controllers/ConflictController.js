(function () {
    var n, e;
    n = ["angular", "core/services/pageUtils", "popup/module"], e = function (n) {
        var e;
        return e = function ($scope, $rootScope, pageUtils) {
            return $scope.extensions = function () {
                return $rootScope.conflicts
            }, $scope.openExtensionPage = function () {
                return function (n) {
                    var e;
                    return e = "chrome://extensions", n && (e += "/?id=" + n), pageUtils.openUrl(e, window.close)
                }
            }(this), $scope.disableAll = function () {
                return function () {
                    var n, e, o, r, i;
                    for (r = $scope.extensions(), i = [], e = 0, o = r.length; o > e; e++)n = r[e], i.push(chrome.management.setEnabled(n.id, !1));
                    return i
                }
            }(this)
        }, n.module("popup").controller("ConflictController", e)
    }, define(n, e)
}).call(this);