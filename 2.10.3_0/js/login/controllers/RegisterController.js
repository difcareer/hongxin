(function () {
    var e, r;
    e = ["angular", "core/module", "core/services/tele", "core/services/pageUtils", "core/services/storage", "login/module"], r = function (e) {
        var r;
        return r = function ($rootScope, $scope, $http, $timeout, tele, pageUtils, storage, SERVER, ERROR_LOGIN_UNKNOWN, ERROR_LOGIN_TIME, LOGIN_EVENT_NAME) {
            return $scope.name = "", $scope.password = "", $scope.password2 = "", $scope.focuses = {
                name: !0,
                password: !1,
                password2: !1
            }, $scope.submitting = !1, $scope.checkingName = !1, $scope.clearNameValidity = function () {
                return $scope.register.name.$setValidity("notTaken", !0)
            }, $scope.checkNameExistence = function () {
                return $rootScope.validateNameFormat($scope.name) ? ($scope.checkingName = !0, $http.get("https://" + SERVER + "/user/name", {params: {name: $scope.name}}).success(function (e) {
                    return e.exists ? $scope.register.name.$setValidity("notTaken", !1) : void 0
                }).error(function () {
                    return $scope.register.name.$setValidity("server", !1), alert($scope.betweenCertInterval() ? ERROR_LOGIN_UNKNOWN : ERROR_LOGIN_TIME)
                })["finally"](function () {
                    return $scope.checkingName = !1
                })) : void 0
            }, $scope.validateConfirmedPassword = function (e) {
                return $scope.password && $scope.password2 ? e === $scope.password ? !0 : void 0 : !0
            }, $scope.doRegister = function () {
                var e, r, n, s, i, a;
                $scope.register.name.$setValidity("server", !0);
                {
                    if ($scope.register.$valid)return $scope.submitting = !0, $http.get("https://" + SERVER + "/user/register", {
                        params: {
                            name: $scope.name,
                            password: $scope.password
                        }
                    }).success(function (e) {
                        var r, n;
                        return e.error ? (r = e.error, n = e.message, "NAME" === r && "请输入用户名" === n ? $scope.register.name.$setValidity("required", !1) : "NAME" === r && "该用户名已存在，请选择其他用户名" === n ? ($scope.register.name.$setValidity("notTaken", !1), $scope.focuses.name = !0) : "PASSWORD" === r && "请输入6位密码" === n ? $scope.register.password.$setValdity("minlength", !1) : alert(n)) : (tele.run("userManager.load", e).then(function () {
                            return tele.run("userManager.checkin").then(function () {
                                return pageUtils.redirectUrl("options.html#/domains")
                            })
                        }), tele.run("track.pv", "/chrome-extension/register/success"), $rootScope.isVirgin && tele.run("track.event", LOGIN_EVENT_NAME, "register-success"), storage.set("afterRegister", !0))
                    }).error(function () {
                        return $scope.register.name.$setValidity("server", !1), alert($scope.betweenCertInterval() ? ERROR_LOGIN_UNKNOWN : ERROR_LOGIN_TIME)
                    })["finally"](function () {
                        return $scope.submitting = !1
                    });
                    for (n = !1, a = ["name", "password", "password2"], s = 0, i = a.length; i > s; s++)r = a[s], e = $scope.register[r], e.$stateVisible = !0, e.$invalid && !n && ($scope.focuses[r] = !0, n = !0)
                }
            }
        }, e.module("login").controller("RegisterController", r)
    }, define(e, r)
}).call(this);