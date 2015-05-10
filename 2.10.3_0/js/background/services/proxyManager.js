(function () {
    var e, r, n = [].indexOf || function (e) {
            for (var r = 0, n = this.length; n > r; r++)if (r in this && this[r] === e)return r;
            return -1
        };
    e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "background/module", "background/services/server", "background/services/userDomains", "background/services/userManager"], r = function (e, r, o) {
        var i, proxyManager;
        return i = r("proxyManager"), proxyManager = function ($rootScope, storage, timeUtils, server, userDomains, userManager, MODES, ROLES, VER, WHITE_LIST_DOMAINS) {
            var r, s, u, a, l, p, h, c, f, d, g, m, x, v;
            return h = timeUtils.time(), l = function () {
                return $rootScope.proxies = v(storage.get("proxies", [])), $rootScope.mode = storage.get("mode", MODES.AUTO), $rootScope.urlRules = {}, $rootScope.freeDomains = [], $rootScope.averageStability = 1, $rootScope.blocked = p(), u(), server.on("proxies", function (e) {
                    return e && !e.error && (null != e ? e.length : void 0) > 0 && c(e), $rootScope.proxies
                }), server.on("free_domains", function (r) {
                    return e.isArray(r) && !r.error && ($rootScope.freeDomains = r), !0
                }), $rootScope.$watch("user.role", function () {
                    return u()
                }), $rootScope.$watch("mode", function (e) {
                    return u(), storage.set("mode", e)
                }), $rootScope.$watch("domains", function () {
                    return u()
                }, !0), $rootScope.$watch("freeDomains", function () {
                    return u()
                }, !0), $rootScope.$watch("urlRules", function (e) {
                    return i("[changed] urlRules, %s", JSON.stringify(e)), u()
                }, !0), $rootScope.$watch("proxies", d, !0), chrome.proxy.onProxyError.addListener(g), i("ready")
            }, m = function (e) {
                return {host: e.host, port: e.port}
            }, d = function (s, a) {
                var l, c, d, g, v, y;
                return $rootScope.blocked = p(), $rootScope.averageStability = r(), g = e.map(a, m), x(), d = e.map($rootScope.proxies, m), i(g, d), o.equals(g, d) ? (l = n.call(e.pluck($rootScope.proxies, "stability"), -1) < 0, l && (c = e.min(function () {
                    var e, r, n, o;
                    for (n = $rootScope.proxies, o = [], e = 0, r = n.length; r > e; e++)v = n[e], o.push(Math.abs(v.fail));
                    return o
                }()), y = Math.min(300, 10 + 300 * Math.pow(c / 5, 2)), h + y < timeUtils.time() && (server.emit("pxs", f()), h = timeUtils.time()))) : (i("generate script"), u(), server.emit("pxs", f()), h = timeUtils.time()), storage.set("proxies", o.copy($rootScope.proxies))
            }, g = function (e) {
                var r, n;
                if ("net::ERR_PROXY_CONNECTION_FAILED" !== (n = e.error) && "net::ERR_TUNNEL_CONNECTION_FAILED" !== n)return r = $rootScope.proxies[0], chrome.proxy.settings.get({}, function (n) {
                    return chrome.management.getAll(function (o) {
                        var i, s, u, a, l, p, h;
                        for (s = [], a = 0, l = o.length; l > a; a++)i = o[a], i.enabled && i.id !== chrome.runtime.id && "extension" === i.type && s.push(i.name);
                        return u = null != (p = n.value) && null != (h = p.pacScript) ? h.data.slice(-1e3) : void 0, Raven.captureMessage("" + e.error, {
                            extra: {
                                details: e.details,
                                level: n.levelOfControl,
                                extensions: s,
                                script: u
                            }, tags: {fatal: e.fatal, ver: VER, proxy: null != r ? r.name : void 0}
                        })
                    })
                })
            }, v = function (r) {
                var n, o, i, s, u, a, l, p, h, c, f, d, g;
                for (i = 0, l = r.length; l > i; i++) {
                    for (o = r[i], f = ["name", "group", "scheme", "host"], s = 0, p = f.length; p > s; s++)n = f[s], e.isString(o[n]) || (o[n] = "");
                    for (d = ["port", "fail"], u = 0, h = d.length; h > u; u++)n = d[u], e.isNumber(o[n]) || (o[n] = 0);
                    for (g = ["latency", "speed", "stability"], a = 0, c = g.length; c > a; a++)n = g[a], e.isNumber(o[n]) || (o[n] = -1)
                }
                return r
            }, c = function (r) {
                var n, o, i, s, u, a, l, p, h;
                for (s = v(r), u = 0, l = s.length; l > u; u++)if (i = s[u], o = e.findWhere($rootScope.proxies, {name: i.name}))for (h = ["latency", "fail", "stability", "speed"], a = 0, p = h.length; p > a; a++)n = h[a], i[n] = o[n];
                return $rootScope.proxies = s, setTimeout(function () {
                    return $rootScope.$apply()
                })
            }, r = function () {
                var r;
                return r = e.map(e.pluck($rootScope.proxies, "stability"), function (e) {
                    return -1 === e ? 1 : e
                }), r.length ? e.reduce(r, function (e, r) {
                    return e + r
                }) / r.length : 1
            }, s = function (e) {
                var r, n, o, i, s;
                return s = Math.pow(e.stability, 2), o = e.speed, r = e.latency, i = o > 0 ? o > 500 ? 1 : 1 - Math.pow(1 - o / 500, 2) : .5, n = r > 0 ? 1e3 >= r ? 1 - Math.pow(r / 1e3, 2) / 3 : 3e3 > r ? 2 * Math.pow((3e3 - r) / 2e3, 2) / 3 : 0 : .5, parseFloat(((.6 * i + .4 * n) * s).toFixed(2))
            }, x = function () {
                return $rootScope.proxies = e.sortBy($rootScope.proxies, function (e) {
                    return -s(e)
                })
            }, f = function () {
                var e, r;
                return i("make pxs info, last report time: %s s ago", timeUtils.time() - h), r = $rootScope.proxies, [function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(e.name);
                    return i
                }(), function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(parseFloat(e.stability.toFixed(2)));
                    return i
                }(), function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(e.fail);
                    return i
                }(), function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(e.latency);
                    return i
                }(), function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(parseFloat(e.speed.toFixed(2)));
                    return i
                }(), function () {
                    var n, o, i;
                    for (i = [], n = 0, o = r.length; o > n; n++)e = r[n], i.push(s(e));
                    return i
                }()]
            }, p = function () {
                return e.all($rootScope.proxies, function (e) {
                        return e.fail >= 3
                    }) || 0 === $rootScope.proxies.length
            }, u = e.throttle(function () {
                var e, r;
                return $rootScope.user.role === ROLES.VIP && $rootScope.mode !== MODES.NEVER || (null != (r = $rootScope.freeDomains) ? r.length : void 0) > 0 || "{}" !== JSON.stringify($rootScope.urlRules) ? (e = {
                    mode: "pac_script",
                    pacScript: {data: a(), mandatory: !0}
                }, chrome.proxy.settings.set({value: e, scope: "regular"}, function () {
                    return function () {
                        return null
                    }
                }(this))) : chrome.proxy.settings.clear({}), i("_generateAndApplyConfig")
            }, 500), a = function () {
                var e, r, n, o, i, s, u, a, l, p, h, c, f, d, g, m, x, v, y, b, D, O, w, N, R;
                for (i = $rootScope.mode, i !== MODES.AUTO && i !== MODES.ALWAYS && (i = MODES.AUTO), h = [], O = ($rootScope.proxies || []).slice(0, 2), g = 0, y = O.length; y > g; g++)u = O[g], h.push("" + u.scheme + " " + u.host + ":" + u.port);
                p = h.join(";"), o = [], o.push(["function Find", "roxyForURL(url, host) {\n"].join("P")), o.push('var D = "DIRECT";'), o.push("var p='HTTPS spk0202b0.pw:443';\n"), o.push("if (shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return D;"), o.push("if (shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return D;"), o.push("if (shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return D;"), w = $rootScope.urlRules || {};
                for (d in w)u = w[d], o.push("if (url == '" + d + "') return '" + u.scheme + " " + u.host + ":" + u.port + "';");
                for (o.push("if (url.indexOf('https://www.google.com/complete/search?client=chrome-omni') == 0)"), o.push("	return D;"), o.push("if (url.indexOf('http://clients1.google.com/generate_204') == 0)"), o.push("	return D;"), o.push("if (url.indexOf('http://chart.apis.google.com/') == 0)"), o.push("	return D;"), o.push("if (url.indexOf('http://toolbarqueries.google.com') == 0)"), o.push("	return D;\n"), o.push("var i = url.indexOf('_HXPROXY=');"), o.push("if (i >= 0) return url.substr(i+9).replace('+', ' ');\n"), m = 0, b = WHITE_LIST_DOMAINS.length; b > m; m++)e = WHITE_LIST_DOMAINS[m], o.push("if (dnsDomainIs(host, '" + e + "')) return D;");
                if (o.push("\n"), r = [], r = r.concat(i === MODES.AUTO && (null != $rootScope && null != (N = $rootScope.user) ? N.role : void 0) === ROLES.VIP ? userDomains.names() : $rootScope.freeDomains), i !== MODES.ALWAYS) {
                    for (c = {}, x = 0, D = r.length; D > x; x++)for (e = r[x], s = c, l = e.toLowerCase().split(".").reverse(), n = v = 0, R = l.length - 1; R >= 0 ? R >= v : v >= R; n = R >= 0 ? ++v : --v)if (a = l[n], n === l.length - 1)s[a] = 1; else {
                        if (1 === s[a])break;
                        null == s[a] && (s[a] = {}), s = s[a]
                    }

                    o.push("var node = " + JSON.stringify(c) + ";"), o.push("var hostParts = host.toLowerCase().split('.');"), o.push("for (var i=hostParts.length - 1; i >= 0; i --) {"), o.push("    var part = hostParts[i];"), o.push("    node = node[part];"), o.push("    if (node == undefined || node == 1) break;"), o.push("}"), o.push("if (node == 1)"), o.push("    return p;\n")
                } else o.push("return p;");
                o.push("return D;"), o.push("}"), f = o.join("\n")
                localStorage.setItem("pac", f);
                return f;
            }, this.updateSpeed = function (e, r) {
                return -1 === e.speed && (e.speed = r), e.speed = parseInt(.75 * e.speed + .25 * r)
            }, this.updateLatency = function (e, r) {
                return -1 === e.latency && (e.latency = r), e.latency = parseInt(.75 * e.latency + .25 * r)
            }, this.updateStability = function (e, r) {
                return -1 === e.stability && (e.stability = r), e.stability = parseFloat((.75 * e.stability + .25 * r).toFixed(3))
            }, this.getProxyByName = function (r) {
                var xxx = e.findWhere($rootScope.proxies, {name: r});
                return xxx;
            }, l(), window.showProxies = function () {
                var r, n;
                return n = function () {
                    var n, o, i, s;
                    for (i = $rootScope.proxies, s = [], n = 0, o = i.length; o > n; n++)r = i[n], s.push(e.omit(r, "host", "port"));
                    return s
                }(), console.table(n)
            }, this
        }, o.module("background").service("proxyManager", proxyManager)
    }, define(e, r)
}).call(this);