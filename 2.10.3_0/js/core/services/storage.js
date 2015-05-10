(function () {
    var r, n;
    r = ["angular", "core/module"], n = function (r) {
        var storage;
        return storage = function () {
            return this.set = function () {
                return function (n, e) {
                    return localStorage[n] = JSON.stringify(r.copy(e)), e
                }
            }(this), this.get = function () {
                return function (r, n) {
                    var e;
                    if (null == n && (n = void 0), void 0 === localStorage[r])return n;
                    try {
                        return JSON.parse(localStorage[r])
                    } catch (o) {
                        return e = o, n
                    }
                }
            }(this), this["default"] = function () {
                return function (r, n) {
                    return null == localStorage[r] && (localStorage[r] = n), localStorage[r]
                }
            }(this), this.remove = function () {
                return function (r) {
                    return localStorage.removeItem(r)
                }
            }(this), this
        }, r.module("core").service("storage", storage)
    }, define(r, n)
}).call(this);