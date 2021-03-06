/*
 AngularJS v1.2.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
 */
(function (G, g, Q) {
    'use strict';
    g.module("ngAnimate", ["ng"]).factory("$$animateReflow", ["$$rAF", "$document", function (g, G) {
        return function (e) {
            return g(function () {
                e()
            })
        }
    }]).config(["$provide", "$animateProvider", function (W, H) {
        function e(e) {
            for (var m = 0; m < e.length; m++) {
                var g = e[m];
                if (g.nodeType == ba)return g
            }
        }

        function B(m) {
            return g.element(e(m))
        }

        var r = g.noop, m = g.forEach, ga = H.$$selectors, ba = 1, h = "$$ngAnimateState", K = "ng-animate", q = {running: !0};
        W.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement",
            "$$asyncCallback", "$rootScope", "$document", function (x, G, aa, L, F, I, Q) {
                function R(a) {
                    if (a) {
                        var b = [], c = {};
                        a = a.substr(1).split(".");
                        (aa.transitions || aa.animations) && a.push("");
                        for (var d = 0; d < a.length; d++) {
                            var f = a[d], e = ga[f];
                            e && !c[f] && (b.push(G.get(e)), c[f] = !0)
                        }
                        return b
                    }
                }

                function M(a, b, c) {
                    function d(a, b) {
                        var c = a[b], d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                        if (c || d)return "leave" == b && (d = c, c = null), u.push({
                            event: b,
                            fn: c
                        }), p.push({event: b, fn: d}), !0
                    }

                    function f(b, d, e) {
                        var f = [];
                        m(b, function (a) {
                            a.fn && f.push(a)
                        });
                        var l = 0;
                        m(f, function (b, m) {
                            var C = function () {
                                a:{
                                    if (d) {
                                        (d[m] || r)();
                                        if (++l < f.length)break a;
                                        d = null
                                    }
                                    e()
                                }
                            };
                            switch (b.event) {
                                case "setClass":
                                    d.push(b.fn(a, n, A, C));
                                    break;
                                case "addClass":
                                    d.push(b.fn(a, n || c, C));
                                    break;
                                case "removeClass":
                                    d.push(b.fn(a, A || c, C));
                                    break;
                                default:
                                    d.push(b.fn(a, C))
                            }
                        });
                        d && 0 === d.length && e()
                    }

                    var e = a[0];
                    if (e) {
                        var h = "setClass" == b, q = h || "addClass" == b || "removeClass" == b, n, A;
                        g.isArray(c) && (n = c[0], A = c[1], c = n + " " + A);
                        var y = a.attr("class") + " " + c;
                        if (T(y)) {
                            var v = r, z = [], p = [], w = r, l = [], u = [], y = (" " + y).replace(/\s+/g,
                                ".");
                            m(R(y), function (a) {
                                !d(a, b) && h && (d(a, "addClass"), d(a, "removeClass"))
                            });
                            return {
                                node: e,
                                event: b,
                                className: c,
                                isClassBased: q,
                                isSetClassOperation: h,
                                before: function (a) {
                                    v = a;
                                    f(p, z, function () {
                                        v = r;
                                        a()
                                    })
                                },
                                after: function (a) {
                                    w = a;
                                    f(u, l, function () {
                                        w = r;
                                        a()
                                    })
                                },
                                cancel: function () {
                                    z && (m(z, function (a) {
                                        (a || r)(!0)
                                    }), v(!0));
                                    l && (m(l, function (a) {
                                        (a || r)(!0)
                                    }), w(!0))
                                }
                            }
                        }
                    }
                }

                function s(a, b, c, d, f, e, q) {
                    function r(d) {
                        var e = "$animate:" + d;
                        w && (w[e] && 0 < w[e].length) && F(function () {
                            c.triggerHandler(e, {event: a, className: b})
                        })
                    }

                    function n() {
                        r("before")
                    }

                    function A() {
                        r("after")
                    }

                    function y() {
                        r("close");
                        q && F(function () {
                            q()
                        })
                    }

                    function v() {
                        v.hasBeenRun || (v.hasBeenRun = !0, e())
                    }

                    function z() {
                        if (!z.hasBeenRun) {
                            z.hasBeenRun = !0;
                            var d = c.data(h);
                            d && (p.isClassBased ? E(c, b) : (F(function () {
                                var d = c.data(h) || {};
                                s == d.index && E(c, b, a)
                            }), c.data(h, d)));
                            y()
                        }
                    }

                    var p = M(c, a, b);
                    if (p) {
                        b = p.className;
                        var w = g.element._data(p.node), w = w && w.events;
                        d || (d = f ? f.parent() : c.parent());
                        var l = c.data(h) || {};
                        f = l.active || {};
                        var u = l.totalActive || 0, C = l.last;
                        if (p.isClassBased && (l.disabled || C && !C.isClassBased) ||
                            O(c, d))v(), n(), A(), z(); else {
                            d = !1;
                            if (0 < u) {
                                l = [];
                                if (p.isClassBased)"setClass" == C.event ? (l.push(C), E(c, b)) : f[b] && (x = f[b], x.event == a ? d = !0 : (l.push(x), E(c, b))); else if ("leave" == a && f["ng-leave"])d = !0; else {
                                    for (var x in f)l.push(f[x]), E(c, x);
                                    f = {};
                                    u = 0
                                }
                                0 < l.length && m(l, function (a) {
                                    a.cancel()
                                })
                            }
                            !p.isClassBased || (p.isSetClassOperation || d) || (d = "addClass" == a == c.hasClass(b));
                            if (d)n(), A(), y(); else {
                                if ("leave" == a)c.one("$destroy", function (a) {
                                    a = g.element(this);
                                    var b = a.data(h);
                                    b && (b = b.active["ng-leave"]) && (b.cancel(), E(a,
                                        "ng-leave"))
                                });
                                c.addClass(K);
                                var s = P++;
                                u++;
                                f[b] = p;
                                c.data(h, {last: p, active: f, index: s, totalActive: u});
                                n();
                                p.before(function (d) {
                                    var e = c.data(h);
                                    d = d || !e || !e.active[b] || p.isClassBased && e.active[b].event != a;
                                    v();
                                    !0 === d ? z() : (A(), p.after(z))
                                })
                            }
                        }
                    } else v(), n(), A(), y()
                }

                function U(a) {
                    if (a = e(a))a = g.isFunction(a.getElementsByClassName) ? a.getElementsByClassName(K) : a.querySelectorAll("." + K), m(a, function (a) {
                        a = g.element(a);
                        (a = a.data(h)) && a.active && m(a.active, function (a) {
                            a.cancel()
                        })
                    })
                }

                function E(a, b) {
                    if (e(a) == e(L))q.disabled ||
                    (q.running = !1, q.structural = !1); else if (b) {
                        var c = a.data(h) || {}, d = !0 === b;
                        !d && (c.active && c.active[b]) && (c.totalActive--, delete c.active[b]);
                        if (d || !c.totalActive)a.removeClass(K), a.removeData(h)
                    }
                }

                function O(a, b) {
                    if (q.disabled)return !0;
                    if (e(a) == e(L))return q.disabled || q.running;
                    do {
                        if (0 === b.length)break;
                        var c = e(b) == e(L), d = c ? q : b.data(h), d = d && (!!d.disabled || d.running || 0 < d.totalActive);
                        if (c || d)return d;
                        if (c)break
                    } while (b = b.parent());
                    return !0
                }

                var P = 0;
                L.data(h, q);
                I.$$postDigest(function () {
                    I.$$postDigest(function () {
                        q.running = !1
                    })
                });
                var V = H.classNameFilter(), T = V ? function (a) {
                    return V.test(a)
                } : function () {
                    return !0
                };
                return {
                    enter: function (a, b, c, d) {
                        this.enabled(!1, a);
                        x.enter(a, b, c);
                        I.$$postDigest(function () {
                            a = B(a);
                            s("enter", "ng-enter", a, b, c, r, d)
                        })
                    }, leave: function (a, b) {
                        U(a);
                        this.enabled(!1, a);
                        I.$$postDigest(function () {
                            s("leave", "ng-leave", B(a), null, null, function () {
                                x.leave(a)
                            }, b)
                        })
                    }, move: function (a, b, c, d) {
                        U(a);
                        this.enabled(!1, a);
                        x.move(a, b, c);
                        I.$$postDigest(function () {
                            a = B(a);
                            s("move", "ng-move", a, b, c, r, d)
                        })
                    }, addClass: function (a,
                                           b, c) {
                        a = B(a);
                        s("addClass", b, a, null, null, function () {
                            x.addClass(a, b)
                        }, c)
                    }, removeClass: function (a, b, c) {
                        a = B(a);
                        s("removeClass", b, a, null, null, function () {
                            x.removeClass(a, b)
                        }, c)
                    }, setClass: function (a, b, c, d) {
                        a = B(a);
                        s("setClass", [b, c], a, null, null, function () {
                            x.setClass(a, b, c)
                        }, d)
                    }, enabled: function (a, b) {
                        switch (arguments.length) {
                            case 2:
                                if (a)E(b); else {
                                    var c = b.data(h) || {};
                                    c.disabled = !0;
                                    b.data(h, c)
                                }
                                break;
                            case 1:
                                q.disabled = !a;
                                break;
                            default:
                                a = !q.disabled
                        }
                        return !!a
                    }
                }
            }]);
        H.register("", ["$window", "$sniffer", "$timeout",
            "$$animateReflow", function (h, q, B, L) {
                function F(a, k) {
                    S && S();
                    X.push(k);
                    S = L(function () {
                        m(X, function (a) {
                            a()
                        });
                        X = [];
                        S = null;
                        N = {}
                    })
                }

                function I(a, k) {
                    var b = e(a);
                    a = g.element(b);
                    Z.push(a);
                    b = Date.now() + 1E3 * k;
                    b <= fa || (B.cancel(ea), fa = b, ea = B(function () {
                        K(Z);
                        Z = []
                    }, k, !1))
                }

                function K(a) {
                    m(a, function (a) {
                        (a = a.data(l)) && (a.closeAnimationFn || r)()
                    })
                }

                function R(a, k) {
                    var b = k ? N[k] : null;
                    if (!b) {
                        var c = 0, d = 0, e = 0, f = 0, l, $, t, g;
                        m(a, function (a) {
                            if (a.nodeType == ba) {
                                a = h.getComputedStyle(a) || {};
                                t = a[J + y];
                                c = Math.max(M(t), c);
                                g = a[J + v];
                                l = a[J +
                                z];
                                d = Math.max(M(l), d);
                                $ = a[n + z];
                                f = Math.max(M($), f);
                                var k = M(a[n + y]);
                                0 < k && (k *= parseInt(a[n + p], 10) || 1);
                                e = Math.max(k, e)
                            }
                        });
                        b = {
                            total: 0,
                            transitionPropertyStyle: g,
                            transitionDurationStyle: t,
                            transitionDelayStyle: l,
                            transitionDelay: d,
                            transitionDuration: c,
                            animationDelayStyle: $,
                            animationDelay: f,
                            animationDuration: e
                        };
                        k && (N[k] = b)
                    }
                    return b
                }

                function M(a) {
                    var k = 0;
                    a = g.isString(a) ? a.split(/\s*,\s*/) : [];
                    m(a, function (a) {
                        k = Math.max(parseFloat(a) || 0, k)
                    });
                    return k
                }

                function s(a) {
                    var k = a.parent(), b = k.data(w);
                    b || (k.data(w, ++da),
                        b = da);
                    return b + "-" + e(a).className
                }

                function U(a, k, b, c) {
                    var d = s(k), f = d + " " + b, m = N[f] ? ++N[f].total : 0, g = {};
                    if (0 < m) {
                        var h = b + "-stagger", g = d + " " + h;
                        (d = !N[g]) && k.addClass(h);
                        g = R(k, g);
                        d && k.removeClass(h)
                    }
                    c = c || function (a) {
                        return a()
                    };
                    k.addClass(b);
                    var h = k.data(l) || {}, t = c(function () {
                        return R(k, f)
                    });
                    c = t.transitionDuration;
                    d = t.animationDuration;
                    if (0 === c && 0 === d)return k.removeClass(b), !1;
                    k.data(l, {running: h.running || 0, itemIndex: m, stagger: g, timings: t, closeAnimationFn: r});
                    a = 0 < h.running || "setClass" == a;
                    0 < c && E(k, b, a);
                    0 < d && (0 < g.animationDelay && 0 === g.animationDuration) && (e(k).style[n] = "none 0s");
                    return !0
                }

                function E(a, b, c) {
                    "ng-enter" != b && ("ng-move" != b && "ng-leave" != b) && c ? a.addClass(u) : e(a).style[J + v] = "none"
                }

                function O(a, b) {
                    var c = J + v, d = e(a);
                    d.style[c] && 0 < d.style[c].length && (d.style[c] = "");
                    a.removeClass(u)
                }

                function P(a) {
                    var b = n;
                    a = e(a);
                    a.style[b] && 0 < a.style[b].length && (a.style[b] = "")
                }

                function V(a, b, c, f) {
                    function g(a) {
                        b.off(y, h);
                        b.removeClass(q);
                        d(b, c);
                        a = e(b);
                        for (var Y in u)a.style.removeProperty(u[Y])
                    }

                    function h(a) {
                        a.stopPropagation();
                        var b = a.originalEvent || a;
                        a = b.$manualTimeStamp || b.timeStamp || Date.now();
                        b = parseFloat(b.elapsedTime.toFixed(C));
                        Math.max(a - z, 0) >= x && b >= v && f()
                    }

                    var p = e(b);
                    a = b.data(l);
                    if (-1 != p.className.indexOf(c) && a) {
                        var q = "";
                        m(c.split(" "), function (a, b) {
                            q += (0 < b ? " " : "") + a + "-active"
                        });
                        var n = a.stagger, t = a.timings, r = a.itemIndex, v = Math.max(t.transitionDuration, t.animationDuration), w = Math.max(t.transitionDelay, t.animationDelay), x = w * ca, z = Date.now(), y = A + " " + H, s = "", u = [];
                        if (0 < t.transitionDuration) {
                            var B = t.transitionPropertyStyle;
                            -1 == B.indexOf("all") && (s += D + "transition-property: " + B + ";", s += D + "transition-duration: " + t.transitionDurationStyle + ";", u.push(D + "transition-property"), u.push(D + "transition-duration"))
                        }
                        0 < r && (0 < n.transitionDelay && 0 === n.transitionDuration && (s += D + "transition-delay: " + T(t.transitionDelayStyle, n.transitionDelay, r) + "; ", u.push(D + "transition-delay")), 0 < n.animationDelay && 0 === n.animationDuration && (s += D + "animation-delay: " + T(t.animationDelayStyle, n.animationDelay, r) + "; ", u.push(D + "animation-delay")));
                        0 < u.length &&
                        (t = p.getAttribute("style") || "", p.setAttribute("style", t + " " + s));
                        b.on(y, h);
                        b.addClass(q);
                        a.closeAnimationFn = function () {
                            g();
                            f()
                        };
                        p = (r * (Math.max(n.animationDelay, n.transitionDelay) || 0) + (w + v) * W) * ca;
                        a.running++;
                        I(b, p);
                        return g
                    }
                    f()
                }

                function T(a, b, c) {
                    var d = "";
                    m(a.split(","), function (a, Y) {
                        d += (0 < Y ? "," : "") + (c * b + parseInt(a, 10)) + "s"
                    });
                    return d
                }

                function a(a, b, c, e) {
                    if (U(a, b, c, e))return function (a) {
                        a && d(b, c)
                    }
                }

                function b(a, b, c, e) {
                    if (b.data(l))return V(a, b, c, e);
                    d(b, c);
                    e()
                }

                function c(c, d, e, f) {
                    var g = a(c, d, e);
                    if (g) {
                        var h =
                            g;
                        F(d, function () {
                            O(d, e);
                            P(d);
                            h = b(c, d, e, f)
                        });
                        return function (a) {
                            (h || r)(a)
                        }
                    }
                    f()
                }

                function d(a, b) {
                    a.removeClass(b);
                    var c = a.data(l);
                    c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(l))
                }

                function f(a, b) {
                    var c = "";
                    a = g.isArray(a) ? a : a.split(/\s+/);
                    m(a, function (a, d) {
                        a && 0 < a.length && (c += (0 < d ? " " : "") + a + b)
                    });
                    return c
                }

                var D = "", J, H, n, A;
                G.ontransitionend === Q && G.onwebkittransitionend !== Q ? (D = "-webkit-", J = "WebkitTransition", H = "webkitTransitionEnd transitionend") : (J = "transition", H = "transitionend");
                G.onanimationend ===
                Q && G.onwebkitanimationend !== Q ? (D = "-webkit-", n = "WebkitAnimation", A = "webkitAnimationEnd animationend") : (n = "animation", A = "animationend");
                var y = "Duration", v = "Property", z = "Delay", p = "IterationCount", w = "$$ngAnimateKey", l = "$$ngAnimateCSS3Data", u = "ng-animate-blocked-transitions", C = 3, W = 1.5, ca = 1E3, N = {}, da = 0, X = [], S, ea = null, fa = 0, Z = [];
                return {
                    enter: function (a, b) {
                        return c("enter", a, "ng-enter", b)
                    }, leave: function (a, b) {
                        return c("leave", a, "ng-leave", b)
                    }, move: function (a, b) {
                        return c("move", a, "ng-move", b)
                    }, beforeSetClass: function (b,
                                                 c, d, e) {
                        var g = f(d, "-remove") + " " + f(c, "-add"), h = a("setClass", b, g, function (a) {
                            var e = b.attr("class");
                            b.removeClass(d);
                            b.addClass(c);
                            a = a();
                            b.attr("class", e);
                            return a
                        });
                        if (h)return F(b, function () {
                            O(b, g);
                            P(b);
                            e()
                        }), h;
                        e()
                    }, beforeAddClass: function (b, c, d) {
                        var e = a("addClass", b, f(c, "-add"), function (a) {
                            b.addClass(c);
                            a = a();
                            b.removeClass(c);
                            return a
                        });
                        if (e)return F(b, function () {
                            O(b, c);
                            P(b);
                            d()
                        }), e;
                        d()
                    }, setClass: function (a, c, d, e) {
                        d = f(d, "-remove");
                        c = f(c, "-add");
                        return b("setClass", a, d + " " + c, e)
                    }, addClass: function (a,
                                           c, d) {
                        return b("addClass", a, f(c, "-add"), d)
                    }, beforeRemoveClass: function (b, c, d) {
                        var e = a("removeClass", b, f(c, "-remove"), function (a) {
                            var d = b.attr("class");
                            b.removeClass(c);
                            a = a();
                            b.attr("class", d);
                            return a
                        });
                        if (e)return F(b, function () {
                            O(b, c);
                            P(b);
                            d()
                        }), e;
                        d()
                    }, removeClass: function (a, c, d) {
                        return b("removeClass", a, f(c, "-remove"), d)
                    }
                }
            }])
    }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map
