(function () {
    var n, r;
    n = ["angular", "md5", "core/module"], r = function (n, r) {
        var generate;
        return generate = function () {
            return this.uuid = function () {
                var n, r, o, e, u, i;
                for (n = "0123456789abcdef".split(""), u = [], e = Math.random, u[8] = u[13] = u[18] = u[23] = "-", u[14] = "4", r = i = 0; 35 >= i; r = ++i)u[r] || (o = 0 | 16 * e(), u[r] = n[19 === r ? 3 & o | 8 : 15 & o]);
                return u.join("")
            }, this.randomId = function (n) {
                var r, o;
                return r = "01234567890abcdefghijklmnopqrstuvwxyz", function () {
                    var e, u;
                    for (u = [], o = e = 1; n >= 1 ? n >= e : e >= n; o = n >= 1 ? ++e : --e)u.push(r[Math.floor(Math.random() * r.length)]);
                    return u
                }().join("")
            }, this.md5 = function (n) {
                return r(n)
            }, this
        }, n.module("core").service("generate", generate)
    }, define(n, r)
}).call(this);