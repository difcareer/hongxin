(function () {
    var e, r;
    e = ["angular", "core/module"], r = function (e) {
        var r, i;
        return i = '<div height="100%" style="margin-top:10px">\n    <iframe width="100%" height="500" frameborder="0" src=""></iframe>\n</div>', r = function ($window) {
            return {
                restrict: "E", scope: {src: "="}, template: i, link: function (r, i) {
                    var n, a, c;
                    return n = i.find("iframe"), n[0].src = r.src, c = i.parent().parent(), a = function () {
                        return n[0].height = c[0].offsetHeight - 20
                    }, e.element($window).bind("resize", a), a()
                }
            }
        }, e.module("core").directive("resizeIframe", r)
    }, define(e, r)
}).call(this);