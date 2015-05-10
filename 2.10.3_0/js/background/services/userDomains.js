(function () {
    var n, e;
    n = ["underscore", "debug", "angular", "core/services/storage", "core/services/domainUtils", "background/module", "background/services/server", "background/services/userDomains"], e = function (n, e, i) {
        var r, userDomains;
        return r = e("userDomains"), userDomains = function ($rootScope, $timeout, storage, domainUtils, server, userManager, ROLES, GUEST_DOMAINS, DEFAULT_DOMAINS) {
            var e, u, o, s, a, c, d, m, l, f, h, v;
            return o = function () {
                return function () {
                    return $rootScope.isSyncing = !1, $rootScope.domains = storage.get("domains", []), $rootScope.$watch("domains", function (n, e) {
                        return i.equals(n, e) ? void 0 : (m(), u())
                    }, !0), $rootScope.$on("checkin-success", function () {
                        var n, e;
                        return (null != (n = $rootScope.user) && null != (e = n.profile) ? e.name : void 0) ? (r("forever sync"), m(), l()) : void 0
                    }), $rootScope.$on("logout", function () {
                        return r("clear domains"), $rootScope.domains = []
                    }), server.on("force_sync_domains", function () {
                        return m()
                    }), r("ready")
                }
            }(this), s = function () {
                var n, e, i, r;
                for (r = [], e = 0, i = DEFAULT_DOMAINS.length; i > e; e++)n = DEFAULT_DOMAINS[e], r.push($rootScope.domains.push({
                    name: n,
                    _dirty: !0,
                    _deleted: !1,
                    _mtime: 0,
                    _init: !0
                }));
                return r
            }, u = function () {
                return storage.set("domains", i.copy($rootScope.domains))
            }, e = function (e) {
                return n.findWhere($rootScope.domains, e)
            }, v = function (n, e) {
                var i, r, u, o, s;
                for (o = ["name", "_dirty", "_deleted", "_mtime", "_init"], s = [], r = 0, u = o.length; u > r; r++)i = o[r], s.push(n[i] = e[i]);
                return s
            }, a = function (n) {
                var i, r, u, o, s;
                if ((null != n ? n.length : void 0) > 0) {
                    for (s = [], u = 0, o = n.length; o > u; u++)i = n[u], r = e({_id: i._id}), s.push(r ? v(r, i) : $rootScope.domains.push(i));
                    return s
                }
            }, h = null, f = null, m = function () {
                return $rootScope.user.role !== ROLES.GUEST ? (h && (clearTimeout(h), h = null), $rootScope.isSyncing ? (h = setTimeout(m, 1e3), r("sync wait")) : (r("sync begin"), $rootScope.isSyncing = !0, clearTimeout(f), f = setTimeout(function () {
                    return $rootScope.isSyncing = !1, f = null
                }, 6e4), c(function () {
                    return r("sync pulled"), d(function () {
                        return setTimeout(function () {
                            return $rootScope.isSyncing = !1, r("sync ok!")
                        }, 5e3), r("sync cooling down")
                    })
                }))) : void 0
            }, c = function () {
                return function (e) {
                    var i, u;
                    return u = n.max(n.union([0], function () {
                        var n, e, r, u;
                        for (r = $rootScope.domains, u = [], n = 0, e = r.length; e > n; n++)i = r[n], u.push(i._mtime);
                        return u
                    }())), r("sync pulling, max_mtime=%s", u), server.emit("sync_domains", {mtime: u}, function (n) {
                        var i;
                        return (null != n && null != (i = n.update) ? i.length : void 0) > 0 && a(n.update), 0 === $rootScope.domains.length && s(), e()
                    })
                }
            }(this), d = function (e) {
                var i;
                return i = {domains: n.where($rootScope.domains, {_dirty: !0})}, i.domains.length ? (r("sync pushing, length=" + i.domains.length), server.emit("dirty_domains", i, function (i) {
                    return i.replace && ($rootScope.domains = n.reject($rootScope.domains, function (n) {
                        return n._dirty
                    }), a(i.replace)), e()
                })) : e()
            }, l = n.once(function () {
                return function () {
                    return setInterval(m, 3e5)
                }
            }(this)), this.match = function (e) {
                return function (i) {
                    var r, u;
                    return r = e.names(), n.any(function () {
                        var n, e, o;
                        for (o = [], n = 0, e = r.length; e > n; n++)u = r[n], o.push(domainUtils.dnsDomainIs(i, u));
                        return o
                    }())
                }
            }(this), this.remove = function (n) {
                var i;
                return i = e({name: n}), i ? (i._dirty = !0, i._deleted = !0, !0) : !1
            }, this.add = function (n) {
                var i;
                return i = e({name: n}), i ? i._deleted ? (i._dirty = !0, i._deleted = !1, !0) : !1 : ($rootScope.domains.push({
                    name: n,
                    _dirty: !0,
                    _deleted: !1,
                    _mtime: 0
                }), !0)
            }, this.change = function (n, i) {
                var r;
                return r = e({name: n}), r && n !== i ? (r.name = i, r._dirty = !0, !0) : !1
            }, this.names = function () {
                return n.filter(n.pluck(n.where($rootScope.domains, {_deleted: !1}), "name"), n.identity)
            }, o(), this
        }, i.module("background").service("userDomains", userDomains)
    }, define(n, e)
}).call(this);