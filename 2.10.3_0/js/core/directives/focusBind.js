(function () {
    var r, c;
    r = ["angular", "core/module"], c = function (r) {
        var c;
        return c = function () {
            return {
                restrict: "A", scope: {focusTrigger: "=focusBind"}, link: function (r, c) {
                    return r.$watch("focusTrigger", function (e) {
                        return e === !0 ? (c[0].focus(), c[0].select(), r.focusTrigger = !1) : void 0
                    })
                }
            }
        }, r.module("core").directive("focusBind", c)
    }, define(r, c)
}).call(this);