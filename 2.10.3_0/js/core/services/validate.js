(function () {
    var n, e;
    n = ["underscore", "angular", "core/module"], e = function (n, e) {
        var validate;
        return validate = function () {
            return this.ip = function (e) {
                var r, i;
                return e ? (i = e.split("."), 4 === i.length && n.every(function () {
                    var n, e, u;
                    for (u = [], n = 0, e = i.length; e > n; n++)r = i[n], u.push(isNaN(r));
                    return u
                }())) : !1
            }, this.email = function (n) {
                return n && n.length >= 6 && /^[\w\-\.]+@[\w\-]+(\.\w+)+$/.test(n)
            }, this.phone = function (n) {
                return n && 11 === n.length && /^1(\d)+$/.test(n)
            }, this.domain = function (n) {
                var e, r;
                return n ? (e = n.trim(), e && 0 < (r = e.indexOf(".")) && r < e.length - 1) : !1
            }, this
        }, e.module("core").service("validate", validate)
    }, define(n, e)
}).call(this);