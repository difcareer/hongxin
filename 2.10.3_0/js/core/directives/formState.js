(function () {
    var r, e;
    r = ["angular", "core/module"], e = function (r) {
        var e;
        return e = function () {
            return {
                restrict: "A", link: function (r, e, n) {
                    var i, s, a, l, o, u, c, d, f, v, $, h;
                    for ($ = n.formState.split("."), l = $[0], a = $[1], s = function () {
                        return r[l][a]
                    }, c = null, i = e.find("div"), d = v = 0, h = i.length; h >= 0 ? h >= v : v >= h; d = h >= 0 ? ++v : --v)if (i.eq(d).hasClass("errors")) {
                        c = i.eq(d);
                        break
                    }
                    return f = e.find("input"), f.on("keydown", function () {
                        return s() ? (s().$stateVisible = !1, r.$apply()) : void 0
                    }).on("blur", function () {
                        return s() && s().$dirty ? (s().$stateVisible = !0, r.$apply()) : void 0
                    }), o = function (r) {
                        return r[l][a].$stateVisible && r[l][a].$invalid
                    }, u = function (r) {
                        var e;
                        return r[l][a].$stateVisible && (null != (e = s()) ? e.$valid : void 0)
                    }, r.$watch(o, function (r) {
                        return r ? (e.addClass("has-error"), c.removeClass("invisible")) : (e.removeClass("has-error"), c.addClass("invisible"))
                    }), r.$watch(u, function (r) {
                        return r ? e.addClass("has-success") : e.removeClass("has-success")
                    })
                }
            }
        }, r.module("core").directive("formState", e)
    }, define(r, e)
}).call(this);