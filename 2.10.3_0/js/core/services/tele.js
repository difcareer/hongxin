(function () {
    var e, r, n = [].slice;
    e = ["debug", "angular", "core/module", "core/services/generate"], r = function (e, r) {
        var tele;
        return tele = function ($rootScope, $q, $timeout, generate) {
            var o, s, u, i, d, l, a, c, f, m, y, p, v, h, g, k, w, I;
            return w = generate.randomId(8), f = e("tele [" + w + "]"), d = e("tele [" + w + "]"), d.log = console.error.bind(console), a = {}, v = {}, m = function (e, r) {
                var n;
                return n = {
                    senderId: w,
                    id: generate.randomId(8),
                    command: "tele.run",
                    type: "request",
                    name: e,
                    args: r
                }, chrome.runtime.sendMessage(n), f("~f> [%s] %s(%o)", n.id, e, r), n
            }, k = function (e, r) {
                var n;
                return n = {
                    senderId: w,
                    id: e.id,
                    command: "tele.run",
                    type: "response"
                }, r.error ? (n.error = r.error, d("=f> [%s] %o", e.id, n.error)) : (n.result = r.result, f("=f> [%s] %o", e.id, n.result)), chrome.runtime.sendMessage(n), n
            }, h = function (e) {
                var r, n, o;
                o = [];
                for (n in e)r = e[n], "scope" !== n && "func" !== n ? (a[n] = r, o.push(f("+ %s()", n))) : d("invalid func name: %s (= reserved names)", n);
                return o
            }, l = function () {
                var e, r, o, s;
                return o = arguments[0], e = 2 <= arguments.length ? n.call(arguments, 1) : [], s = m(o, e), r = $q.defer(), v[s.id] = {
                    request: s,
                    deferred: r
                }, $timeout(function () {
                    return v[s.id] ? (delete v[s.id], r.reject("timeout"), d("=f> %o", s.id, "timeout")) : void 0
                }, 3e3), r.promise
            }, g = {}, o = function (e) {
                var r;
                return r = {
                    senderId: w,
                    command: "tele.scope",
                    type: "ask",
                    key: e
                }, chrome.runtime.sendMessage(r), f("~s> [%s]", e)
            }, i = function (e, r) {
                var n;
                return n = {
                    senderId: w,
                    command: "tele.scope",
                    type: "emit",
                    key: e,
                    value: r
                }, chrome.runtime.sendMessage(n), f("=s> [%s] %o", e, r)
            }, u = function (e, r) {
                var n;
                return n = {
                    senderId: w,
                    command: "tele.scope",
                    type: "emit",
                    key: e,
                    delta: r
                }, chrome.runtime.sendMessage(n), f("=s> [%s %o", e, r)
            }, c = function (e, n) {
                var o, s, u, i, d, l, a, c, f, m, y;
                for (l = {}, i = {}, c = 0, m = n.length; m > c; c++)o = n[c], l[JSON.stringify(r.copy(o))] = o;
                for (f = 0, y = e.length; y > f; f++)o = e[f], i[JSON.stringify(r.copy(o))] = o;
                d = [], u = [];
                for (s in l)a = l[s], void 0 === i[s] && d.push(a);
                for (s in i)a = i[s], void 0 === l[s] && u.push(a);
                return {old: d, "new": u}
            }, p = function (e, n) {
                var o, s, u, i, d, l, a, c, f, m, y;
                for (c = n.old, u = 0, l = c.length; l > u; u++)for (s = c[u], o = i = f = e.length - 1; 0 >= f ? 0 >= i : i >= 0; o = 0 >= f ? ++i : --i)r.equals(e[o], s) && e.splice(o, 1);
                for (m = n["new"], y = [], d = 0, a = m.length; a > d; d++)s = m[d], y.push(e.push(s));
                return y
            }, I = function (e) {
                var n;
                return n = g[e], n.unwatch ? void 0 : (n.unwatch = $rootScope.$watch(e, function (o, s) {
                    if (!r.equals(o, s))if (n.list) {
                        if (!n.mute)return u(e, c(o, s))
                    } else if (!n.mute)return i(e, o)
                }, !0), setTimeout(function () {
                    return $rootScope.$apply()
                }))
            }, s = function (e, r) {
                var n, s;
                return null == r && (r = void 0), n = $q.defer(), null == g[e] && (g[e] = {
                    ready: !1,
                    defers: [],
                    owner: (null != r ? r.owner : void 0) || !1,
                    list: (null != r ? r.list : void 0) || !1,
                    unwatch: null,
                    mute: !1
                }), s = g[e], s.ready ? (setTimeout(function () {
                    return n.resolve($rootScope[e])
                }), I(e)) : s.owner ? (s.ready = !0, setTimeout(function () {
                    return n.resolve($rootScope[e]), i(e, $rootScope[e])
                }), I(e)) : (s.defers.length || o(e), s.defers.push(n)), n.promise
            }, chrome.runtime.onMessage.addListener(function (e) {
                var r, n, o, s, u, l, c, m, y, h, q, M, $;
                if (e.senderId !== w && ("tele.run" === (q = e.command) || "tele.scope" === q)) {
                    if ("tele.run" === e.command) {
                        if ("request" === e.type && a[e.name]) {
                            f("<f~ [%s] %s(%o)", e.id, e.name, e.args), s = a[e.name];
                            try {
                                m = s.apply(null, e.args)
                            } catch (T) {
                                return o = T, d("=f= %o", o), k(e, {error: o})
                            }
                            l = $q.when(m), l.then(function (r) {
                                return k(e, {result: r})
                            }, function (r) {
                                return k(e, {error: r})
                            })
                        }
                        "response" === e.type && v[e.id] && (M = v[e.id], c = M.request, n = M.deferred, delete v[e.id], e.error ? (d("<f= [%s] %o", e.id, e.error), n.reject(e.error)) : (f("<f= [%s] %o", e.id, e.result), n.resolve(e.result)))
                    } else if ("tele.scope" === e.command && g[e.key] && (u = g[e.key], "ask" === e.type && u.owner && (f("<s~ [%s]", e.key), i(e.key, $rootScope[e.key])), "emit" === e.type))try {
                        if (u.mute = !0, e.delta ? (f("<s= [%s] %o", e.key, e.delta), p($rootScope[e.key], e.delta)) : (f("<s= [%s] %o", e.key, e.value), $rootScope[e.key] = e.value), $rootScope.$apply(), u.mute = !1, u = g[e.key], u.defers.length) {
                            for ($ = u.defers, y = 0, h = $.length; h > y; y++)r = $[y], r.resolve($rootScope[e.key]);
                            u.defers = [], u.ready = !0, I(e.key)
                        }
                    } catch (T) {
                        o = T, d(o)
                    }
                    return $rootScope.$apply()
                }
            }), y = {func: h, run: l, scope: s}
        }, r.module("core").factory("tele", tele)
    }, define(e, r)
}).call(this);