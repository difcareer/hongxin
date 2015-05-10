(function () {
    var n, e;
    n = ["angular", "ngRoute", "ui.keypress", "ui.utils", "mgcrea.ngStrap", "core/module", "angular_translate"], e = function (n) {
        return n.module("login", ["ngRoute", "ui.keypress", "mgcrea.ngStrap", "ui.utils", "core", "pascalprecht.translate"]).constant({
            LOGIN_EVENT_NAME: "virgin-login-0619",
            ERROR_LOGIN_TIME: "您的系统日期有误，无法建立安全连接，请修正系统日期后重启浏览器。",
            ERROR_LOGIN_UNKNOWN: "未知错误，可能原因是:\n1.您使用了其他代理服务器，请先关闭\n2.系统日期有误，请修改后重启浏览器\n3.红杏正在维护，请过10分钟再试"
        })
    }, define(n, e)
}).call(this);