(function () {
    var e, r;
    e = ["angular", "options/module"], r = function (e) {
        var r;
        return r = function ($scope, $rootScope, $timeout, $translate) {
            return $scope.initAlertText = $translate.instant("options.change_password.init_alert"), $scope.initAlertStyle = "alert-info", $scope.alertText = $scope.initAlertText, $scope.alertStyle = $scope.initAlertStyle, $scope.alert = function (e) {
                return $scope.alertText = e, $scope.alertStyle = "alert-danger", $timeout(function () {
                    return $scope.alertText = $scope.initAlertText, $scope.alertStyle = $scope.initAlertStyle
                }, 2e3)
            }, $scope.closeModal = function () {
                return $rootScope.passwordModal.destroy()
            }
        }, e.module("options").controller("ChangePasswordModalController", r)
    }, define(e, r)
}).call(this);