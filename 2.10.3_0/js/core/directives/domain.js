(function () {
    var e, n;
    e = ["underscore", "angular", "angular_translate", "core/module", "core/services/validate", "core/services/tele"], n = function (e, n) {
        var i;
        return i = function ($rootScope, validate, tele, $translate) {
            return {
                restrict: "E",
                scope: {model: "="},
                templateUrl: "partials/options/_domain.html",
                link: function (n) {
                    return n.edition = {name: ""}, n.update = function () {
                        var i, r;
                        return i = n.model, r = n.edition.name.trim(), i.name === r ? n.edit(!1) : validate.domain(r) ? e.findWhere($rootScope.domains, {name: r}) ? console.log($translate.instant("options.domain.already_added")) : (tele.run("userDomains.change", i.name, r), n.editing = !1) : console.log($translate.instant("options.domain.enter_correct_domain"))
                    }, n.remove = function () {
                        return tele.run("userDomains.remove", n.model.name)
                    }, n.edit = function (e) {
                        return null == e && (e = !0), e ? (n.edition.name = n.model.name, n.editing = !0, n.focusInput = !0) : n.editing = !1
                    }
                }
            }
        }, n.module("core").directive("domain", i)
    }, define(e, n)
}).call(this);