(function () {
    var e, n;
    e = ["angular", "core/module"], n = function (e) {
        var n;
        return n = function () {
            return {
                restrict: "A", require: "?ngModel", link: function (e, n, r, u) {
                    var validate;
                    if (u)return e.$watch(r.ngModel, function () {
                        return validate()
                    }), r.$observe("equals", function () {
                        return validate()
                    }), validate = function () {
                        var e, n;
                        return e = u.$viewValue, n = r.equals, u.$setValidity("equals", e === n)
                    }
                }
            }
        }, e.module("core").directive("equals", n)
    }, define(e, n)
}).call(this);