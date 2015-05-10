(function () {
    var n, r, e = [].indexOf || function (n) {
            for (var r = 0, e = this.length; e > r; r++)if (r in this && this[r] === n)return r;
            return -1
        };
    n = ["angular", "core/module", "core/services/validate"], r = function (n) {
        var domainUtils;
        return domainUtils = function (validate) {
            var n, r;
            return this.dnsDomainIs = function (n, r) {
                var e, i;
                return n === r ? !0 : (e = n.lastIndexOf(r), 0 >= e ? !1 : (i = n.length - (e + r.length), "." === n[e - 1] && 0 >= i ? !0 : !1))
            }, n = document.createElement("a"), this.parseUri = function (r) {
                var e, i;
                return r ? (n.href = r, i = n.search, e = {}, i && (i = i.slice(1), i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (n, r, i) {
                    return n ? e[r] = i : void 0
                })), {
                    protocol: n.protocol.slice(0, -1),
                    user: n.username,
                    password: n.password,
                    host: n.hostname,
                    port: n.port,
                    path: n.pathname,
                    hash: n.hash,
                    query: e
                }) : {}
            }, r = function (n) {
                return n.replace(/[^0-9a-zA-Z\-\.]/gi, "")
            }, this.trimDomain = function (n) {
                return n = r(n), n ? n.trim() : ""
            }, this.topDomain = function (n) {
                return function (r) {
                    var i, a, s, m, o, u;
                    if (r = n.trimDomain(r), !r)return r;
                    if (/^\d+\.\d+\.\d+\.\d+$/.test(r))return r;
                    if (!validate.domain(r))return r;
                    for (a = ["ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bu", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cx", "cy", "cz", "dd", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "yu", "za", "zm", "zr", "zw", "com", "net", "org", "mil", "gov", "edu", "nato", "info", "int", "name", "biz", "mobi", "museum", "pro", "tel", "asia", "xxx"], m = r.split("."), o = [], i = u = m.length - 1; u >= 0; i = u += -1) {
                        if (s = m[i], !(e.call(a, s) >= 0 || i === m.length - 1)) {
                            o.unshift(s);
                            break
                        }
                        o.unshift(s)
                    }
                    return o.join(".")
                }
            }(this), this
        }, n.module("core").service("domainUtils", domainUtils)
    }, define(n, r)
}).call(this);