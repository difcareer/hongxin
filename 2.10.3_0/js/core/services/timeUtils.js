(function () {
    var e, i;
    e = ["angular", "core/module"], i = function (e) {
        var timeUtils;
        return timeUtils = function () {
            return this.time = function () {
                return parseInt((new Date).getTime() / 1e3)
            }, this.milliTime = function () {
                return (new Date).getTime()
            }, this
        }, e.module("core").service("timeUtils", timeUtils)
    }, define(e, i)
}).call(this);