(function () {
    var n, e, r = [].slice;
    n = ["underscore", "debug"], e = function (n, e) {
        var u, EasySocket, i, o, c, s, l, a, f, h, g, d, y;
        return d = e("EasySocket"), g = e("EasySocket"), g.log = console.error.bind(console), u = 5e3, i = 8e3, o = 17e3, s = 0, a = 2, l = 3, c = 4, h = function () {
            return function (n, e, r, u) {
                return null == e && (e = ""), null == r && (r = ""), null == u && (u = ""), n === a ? "2" : JSON.stringify([n, e, r, u])
            }
        }(this), f = function () {
            return function (n) {
                if ("2" === n)return [a, "", "", ""];
                try {
                    return JSON.parse(n)
                } catch (e) {
                    return g = e, [a, "", "", ""]
                }
            }
        }(this), y = function () {
            return (new Date).getTime()
        }, EasySocket = function () {
            var n, e;
            return e = null, this.setUrl = function (n) {
                return e ? g("url is already set: %s", e) : e = n
            }, this.$get = function ($rootScope) {
                return new n($rootScope)
            }, n = function ($rootScope) {
                var n, p, v, m, S, J, N, O, $, w, T, b, k, x, M;
                return M = null, J = {
                    connect: [],
                    connecting: [],
                    reconnect: [],
                    reconnecting: [],
                    disconnect: []
                }, n = {}, $ = 0, m = -1, T = -1, x = null, N = function () {
                    return setInterval(function () {
                        return p() && b(h(a)), y() - $ > o && T > -1 ? w() : void 0
                    }, i)
                }, v = function () {
                    return function () {
                        return d("~~~ " + e), $ = y(), x && (clearTimeout(x), x = null), T > 0 ? O("reconnecting", T) : O("connecting"), $rootScope.$apply(), M && (M.close(), M.onopen = null, M.onmessage = null, M.onclose = null, M = null), M = new WebSocket(e), M.onopen = function () {
                            return d("=== %s", e), $ = y(), T > 0 ? O("reconnect", T) : O("connect"), $rootScope.$apply(), T = 0
                        }, M.onmessage = function (e) {

                            var r, u, i, o, h, p, v, m, N;
                            switch ($ = y(), m = f(e.data), o = m[0], r = m[1], h = m[2], i = m[3], o) {
                                case s:
                                    return d("--X"), S();
                                case a:
                                    return null;
                                case l:
                                    console.log(i);
                                    for (d("--< [%s] %s %s", r, h, JSON.stringify(i)), N = J[h] || [], p = 0, v = N.length; v > p; p++)u = N[p], "function" == typeof u ? r ? k(r, u(i)) : u(i) : r && k(r);
                                    return $rootScope.$apply();
                                case c:
                                    console.log(i);
                                    return d("<-- [%s] %s", r, JSON.stringify(i)), "function" == typeof n[r] && n[r](i), $rootScope.$apply();
                                default:
                                    return g("-!< %o", e.data), d("Invalid MessageType: %s", o)
                            }
                        }, M.onclose = function () {
                            return d("xxx %s", e), T > -1 ? w() : (O("disconnect"), $rootScope.$apply())
                        }
                    }
                }(this), w = function () {
                    var n;
                    if (!x)return T += 1, n = Math.min(500 * Math.pow(2, T - 1), 2e4), x = setTimeout(v, n), d("~" + T + "~ " + n + " ms later")
                }, S = function () {
                    return T = -1, null != M ? M.close() : void 0
                }, b = function (n) {
                    return p() ? M.send(n) : "2" !== n ? d("not alive, cannot send %o, state=%s", n, M.readyState) : void 0
                }, k = function (n, e) {
                    var r;
                    console.log(e);
                    return r = h(c, n, null, e), d("--> [%s] %s", n, JSON.stringify(e)), b(r)
                }, p = function () {
                    return M && 1 === M.readyState
                }, O = function (n, e) {
                    var r, u, i, o, c;
                    for (o = J[n] || [], c = [], u = 0, i = o.length; i > u; u++)r = o[u], c.push(r(e));
                    return c
                }, this.alive = function () {
                    return function () {
                        return p()
                    }
                }(this), this.connect = function () {
                    return function () {
                        return T = 0, v()
                    }
                }(this), this.disconnect = function () {
                    return function () {
                        return S()
                    }
                }(this), this.emit = function () {
                    return function () {
                        var e, i, o, c, s, a;
                        s = arguments[0], a = 2 <= arguments.length ? r.call(arguments, 1) : [];
                        try {
                            return o = "", i = void 0, a.length >= 2 ? (o = a[0], i = a[1]) : 1 === a.length && ("function" == typeof a[0] ? i = a[0] : o = a[0]), e = m += 2, i && (n[e] = i, setTimeout(function () {
                                return delete n[e]
                            }, u)), c = h(l, e, s, o), d(">-- [%s] %s %s", e, s, JSON.stringify(o)), b(c)
                        } catch (f) {
                        }
                    }
                }(this), this.on = function () {
                    return function (n, e) {
                        return null == J[n] && (J[n] = []), J[n].push(e)
                    }
                }(this), N(), this
            }, this
        }
    }, define(n, e)
}).call(this);