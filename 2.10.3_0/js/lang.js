(function () {
    define([], function () {
        var e, n, o, r, i, a, s, h;
        for (e = {languages: ["zh", "en"]}, i = {
            app: {en: "Red Apricot", zh: "红杏"},
            common: {
                cancel: {en: "Cancel", zh: "取消"},
                ok: {en: "OK", zh: "确定"},
                startup_failed: {
                    en: "Red Apricot load failed. Please restart the extension or browser.",
                    zh: "红杏加载失败，请重启插件或浏览器"
                },
                vip_expire: {t1: {en: "Expire in", zh: " "}, t2: {en: " ", zh: "后到期"}}
            },
            login: {
                title: {en: "Log into Red Apricot ", zh: "登录红杏"},
                head: {en: "Surf on the Internet without borders!", zh: "上网本该如此简单"},
                account: {en: "E-mail", zh: "账号"},
                password: {en: "Password", zh: "密码"},
                login: {en: "Log in", zh: "登录"},
                register: {en: "Register", zh: "注册"},
                confirm_password: {en: "Confirm password", zh: "确认密码"},
                name_placeholder: {en: "Please enter your e-mail address", zh: "请输入 邮箱/手机号码"},
                password_placeholder: {en: "Please enter your password", zh: "请输入密码"},
                confirm_password_placeholder: {en: "Please re-enter your password", zh: "请重复上面的密码"},
                find_password: {en: "Retrieve password", zh: "找回密码"},
                messages: {
                    success_logout: {en: "Successfully log out", zh: "已成功退出登录"},
                    notice_must_login_or_register: {
                        en: "Please log in first or register a Red Apricot account",
                        zh: "请先登录 或 注册红杏账号"
                    },
                    contact_me: {
                        en: "If you have any question, please feel free to contact us via luyou@honx.in",
                        zh: "如有问题，请联系官方QQ 56214850"
                    }
                },
                errors: {
                    name_required: {en: "Please enter your account.", zh: "请输入账号"},
                    format: {en: "Invalid e-email address", zh: "格式不正确，请输入邮箱或手机号"},
                    server: {en: "Request failed. Please try again later.", zh: "连不上服务器，请稍后再试"},
                    notExisted: {en: "User not found. Please try other e-mails", zh: "账号不存在，请登录其他用户名"},
                    notTaken: {en: "Account exists. Please choose another", zh: "账号已存在，请选择其他用户名"},
                    password_required: {en: "Password required", zh: "请输入密码"},
                    password2_required: {en: "Confirm password required", zh: "请输入确认密码"},
                    minlength: {en: "At least 6 characters", zh: "请输入至少六位密码"},
                    password_not_same: {en: "Not match with the above one", zh: "和上面的密码不一致"},
                    mismatch: {en: "Incorrect password", zh: "您输入的密码不正确"}
                }
            },
            popup: {
                title: {en: "Red Apricot", zh: "红杏"},
                menu: {
                    current_domain: {en: "Current Domain", zh: "当前域名"},
                    unavailable_domains: {en: "Unavailable domains", zh: "疑似无法访问的域名"},
                    add_domain: {en: "Filter domains", zh: "添加域名到规则列表"},
                    delete_domain: {en: "Do not filter this domain", zh: "从规则列表删除此域名"},
                    has_domain: {en: "Site added to filters", zh: "本站已进入规则列表"},
                    mode: {en: "Mode", zh: "运行模式"},
                    auto: {
                        name: {en: "By filters", zh: "按需"},
                        desc: {
                            en: "Only domains in the filtered list will be loaded via Red Apricot",
                            zh: "只对规则列表中的网站使用红杏的线路"
                        }
                    },
                    always: {
                        name: {en: "Always", zh: "一直"},
                        desc: {en: "Every page will be loaded via Red Apricot", zh: "使用红杏的线路访问所有网站（访问普通网站会变慢）"}
                    },
                    never: {
                        name: {en: "Off", zh: "关闭"},
                        desc: {en: "Every page will be loaded via your normal connection", zh: "只使用本机的 直接连接 上网"}
                    },
                    nav: {
                        filters: {en: "My filters", zh: "规则列表"},
                        invitations: {en: "Get 10 days for free", zh: "邀请朋友各送10天"}
                    },
                    renew: {en: "Renew", zh: "续费"}
                },
                conflict: {
                    title: {en: "A conflict extension detected", zh: "检测到冲突插件"},
                    text: {
                        p1: {
                            en: "These extensions' proxy configuration are in conflict with Red Apricot. Please click",
                            zh: "以上插件的代理配置与红杏冲突，请点击到"
                        }, p2: {en: "Extension List", zh: "插件列表"}, p3: {en: "，Temporarily disable them", zh: "，暂时禁用他们"}
                    },
                    disable_all: {en: "Close above extensions", zh: "一键关闭冲突插件"}
                }
            },
            options: {
                my_inviter_placeholder: {en: "My inviter（E-mail address/phone number）", zh: "我的邀请人（邮箱/手机号）"},
                change_password: {
                    title: {en: "Change password", zh: "修改密码"},
                    old_password: {en: "Original password", zh: "原密码"},
                    new_password: {en: "New password", zh: "新密码"},
                    re_password: {en: "Re-enter your new password", zh: "重复新密码"},
                    confirm_update: {en: "Save", zh: "确认修改"},
                    init_alert: {
                        en: "Please enter the original password and the new password twice",
                        zh: "请输入 旧密码 和 2次新密码，并确认修改"
                    },
                    alert: {
                        old_password_error: {en: "Please enter the correct original password", zh: "请输入正确的旧密码"},
                        new_password_short: {
                            en: "Please enter a new password with at least six characters",
                            zh: "请输入至少6位新密码"
                        },
                        password2_not_same: {
                            en: "The two new passwords entered are not the same. Please check and modify them.",
                            zh: "2次输入的新密码不一致，请检查并修改"
                        },
                        success_change: {en: "The password is successfully modified", zh: "密码已成功修改"},
                        connection_failed: {en: "Network error. Please try again later.", zh: "网络错误，请稍后重试"}
                    }
                },
                domain: {
                    locked_title: {en: "You can edit it after becoming a VIP.", zh: "成为VIP后即可编辑"},
                    delete_domain: {en: "Delete domains", zh: "删除域名"},
                    already_added: {en: "This domain is added already.", zh: "此域名已经被添加"},
                    enter_correct_domain: {en: "Please enter a domain in the correct format.", zh: "请输入正确格式的域名"}
                },
                domain_list: {
                    title: {en: "My Filters", zh: "规则列表"},
                    add_domain: {en: "Add domain", zh: "添加域名"},
                    add_domain_placeholder: {en: "www.netflix.com", zh: "请输入域名，按回车添加"},
                    help_block_text: {
                        en: "When opening the following domains Red Apricot proxy server will be automatically used",
                        zh: "在访问下面的的域名时，会自动使用红杏的代理服务器，解决无法访问问题"
                    },
                    sort_by_time: {en: "Sort by time", zh: "按照时间排序"},
                    sort_by_char: {en: "Sort by alphabet", zh: "按照字母排序"},
                    error: {
                        empty: {en: "Please enter a domain.", zh: "请输入域名"},
                        domain_added: {
                            en: "The domain is added already. No need to be added again.",
                            zh: "此域名已经被添加，无需再添加"
                        },
                        format: {en: "The domain format is incorrect.", zh: "域名格式不正确"}
                    }
                },
                invitation: {
                    title: {en: "Get 10 days for free!", zh: "邀请奖励"},
                    my_inviter: {en: "My inviter:", zh: "我的邀请人："},
                    not_set: {en: "Not set", zh: "未设定"},
                    invite_url: {en: "Your invite link:", zh: "邀请链接："},
                    invite_skill: {en: "How to invite effectively", zh: "邀请技巧"},
                    prerequisites: {en: "Reward conditions:", zh: "奖励条件："},
                    prerequisite_remark: {en: " ", zh: "（需要同时满足2条，但不计先后顺序）"},
                    reward: {en: "Rewards", zh: "奖"},
                    me: {en: "Me", zh: "我"},
                    step1: {
                        en: "Your friend use your invite link <b> to install Red Apricot </b>.",
                        zh: "小伙伴通过你的邀请链接 <b>安装红杏</b>"
                    },
                    step2: {
                        en: "Your friend <b> become</b> Red Apricot VIP (a package of 30 days or above).",
                        zh: "小伙伴 <b>充值</b> 成为红杏VIP（30天或以上套餐）"
                    },
                    step3: {
                        en: "<b>Both sides </b> get a <b> 10-day VIP service for FREE </b>!",
                        zh: "<b>双方</b> 都获得 <b>10天VIP</b> 的奖励"
                    },
                    receiver: {en: "Receiver", zh: "被邀请人"},
                    vip_status: {en: "Vip Status", zh: "vip状态"},
                    fetch_reward: {en: "Rewards", zh: "领取奖励"},
                    invite_no_one: {en: "Have not invited anyone to use Red Apricot yet.", zh: "暂时还没有邀请任何人使用红杏"},
                    invite: {en: " - Accepted Invitation", zh: "邀请"},
                    not_vip: {en: "Not open VIP services", zh: "未开通VIP"},
                    not_monthly_vip: {en: "Not purchase the package of 30 days or above", zh: "未购买30天或以上套餐"},
                    rewardable: {en: "Active", zh: "已开通"},
                    fetch_10_day_vip: {en: "Fetch rewards", zh: "点击领取10天VIP"},
                    rewarded: {en: "Yes", zh: "已领取"},
                    not_rewardable: {en: "Not eligible", zh: "暂无"},
                    account_not_correct: {en: "The account you entered is incorrect", zh: "输入账号不正确"}
                },
                order_history: {
                    title: {en: "My Orders", zh: "订单历史"},
                    order_time: {en: "Order time", zh: "下单时间"},
                    order_no: {en: "Order Number", zh: "订单号"},
                    plan: {en: "Package", zh: "套餐"},
                    price: {en: "Price", zh: "价格"},
                    status: {en: "Status", zh: "状态"},
                    day: {en: " Days", zh: "天"},
                    empty_order: {en: "No record of recharge", zh: "还没有任何充值记录"},
                    pay_now: {en: "Recharge now?", zh: "立即充值？"},
                    status_name: {
                        init: {en: "Initiate", zh: "新建"},
                        wait_buyer_pay: {en: "Wait the buyer to pay", zh: "等待付款"},
                        wait_seller_send_goods: {en: "Wait the seller to send goods", zh: "等待发货"},
                        wait_buyer_confirm_goods: {en: "Wait the buyer to confirm goods", zh: "等待确认收货"},
                        trade_finished: {en: "Complete", zh: "成功"},
                        trade_closed: {en: "Trade closed", zh: "交易取消"},
                        unknown: {en: "unknown", zh: "未知"}
                    }
                },
                layout: {
                    menu: {en: "Menu", zh: "菜单"},
                    dropdown: {
                        change_password: {en: "Change password", zh: "修改密码"},
                        find_password: {en: "Retrieve password", zh: "找回密码"},
                        logout: {en: "Log out", zh: "退出登录"}
                    },
                    not_vip: {en: "Not open", zh: "未开通服务"},
                    expire: {en: "Expired", zh: "服务已过期"},
                    second: {en: "Second", zh: "秒"},
                    minute: {en: "Minute", zh: "分"},
                    hour: {en: "Hour", zh: "小时"},
                    day: {en: " Days", zh: "天"},
                    vip_tooltip: {en: "According to the expiration date", zh: "根据到期日计算"},
                    service: {en: "Service", zh: "服务期"},
                    line_usable: {en: "Network strength", zh: "线路可用性"},
                    extend_vip: {en: "Extend VIP service", zh: "续费 VIP"},
                    open_vip: {en: "Open VIP service", zh: "开通 VIP"},
                    domain_list: {en: "My Filters", zh: "规则列表"},
                    order_history: {en: "My Orders", zh: "历史订单"},
                    invitation: {en: "Get 10 days for free", zh: "邀请朋友各送10天"},
                    blog: {en: "Blog", zh: "官方博客"},
                    guide: {en: "Guide", zh: "使用教程"}
                },
                alerts: {
                    end_free: {
                        en: "To maintain stable services, Red Apricot has ended free services and turned its focus on providing high-quality VIP services.",
                        zh: "为了维护服务的稳定性，红杏已停止提供免费服务，专注于提供高质量的VIP服务。"
                    },
                    two_ways_to_open_vip: {
                        en: "You can open VIP service in the following two ways:",
                        zh: "通过以下2种方式可以开通VIP服务："
                    },
                    buy_vip: {en: "Buy VIP services", zh: "购买VIP"},
                    watch_price: {en: "(Click to see the price）", zh: "(点击看价格）"},
                    invite_friends: {en: "Invite your friends to use Red Apricot", zh: "邀请好友使用红杏"},
                    watch_detail: {en: "（Click to see details）", zh: "（点击查看详情）"},
                    free_privilege: {
                        en: "Although unable to provide complete services, we still quietly unlocked the access barriers of these domains:",
                        zh: "虽然不能提供完整的服务，但我们还是悄悄地解开了这些域名的访问障碍："
                    },
                    enjoy_free: {en: "Enjoy it before becoming a VIP.", zh: "可以在成为VIP之前体验一下效果哦"},
                    expire: {en: "Your VIP has expired. Please pay timely.", zh: "VIP已过期，请及时续费"}
                }
            },
            notifications: {
                create_vip: {
                    title: {en: "Please open VIP services.", zh: "请开通VIP服务"},
                    message: {
                        en: "Red Apricot has shut down free services. Please open paid VIP services.",
                        zh: "红杏已关闭免费服务，请开通付费VIP服务。"
                    },
                    contextMessage: {en: "（As low as 1 yuan. Click to see the price.）", zh: "（低至1元，点击看价格）"}
                },
                renew_vip: {
                    title: {en: "Your VIP has expired.", zh: "VIP已过期"},
                    message: {
                        en: "To continue to get the services from Red Apricot, please pay timely.",
                        zh: "为了能够继续使用红杏的服务，请及时续费。"
                    },
                    contextMessage: {en: "（Click to pay）", zh: "（点击续费）"},
                    button_title: {en: "No further prompts", zh: "不再提示"}
                }
            },
            upgrade: {
                title: {en: "This is an ancient version, please Upgrade", zh: "红杏版本过低，请升级"},
                p1: {
                    t1: {
                        en: "The version of Red Apricot is too low, please install the latest version from",
                        zh: "您的红杏版本过低，请移步"
                    }, t2: {en: "", zh: "安装新版本"}
                },
                if_trouble: {
                    en: "If you have trouble opening Chrome Store, please refer to the article from our official blog",
                    zh: "如果访问谷歌有障碍，请参考官方博客中的"
                },
                manual_install_tutorial: {en: "Manual install tutorial", zh: "手动安装教程"},
                uninstall_first: {
                    en: "Before installing a new version, please open chrome://extensions/ and remove the old version",
                    zh: "安装之前，请先到插件列表（在地址栏中打开：chrome://extensions/）卸载老版本。"
                }
            }
        }, r = function (e, n, o) {
            var i, a;
            null == o && (o = null), null == o && (o = {});
            for (i in e)a = e[i], null != a[n] ? o[i] = a[n] : (o[i] = {}, r(a, n, o[i]));
            return o
        }, h = e.languages, a = 0, s = h.length; s > a; a++)n = h[a], o = r(i, n), e[n] = o;
        return e.config = function ($translateProvider) {
            var e, o, r;
            for (r = this.languages, e = 0, o = r.length; o > e; e++)n = r[e], $translateProvider.translations(n, this[n]);
            return $translateProvider.registerAvailableLanguageKeys(this.languages, {
                en_US: "en",
                en_UK: "en"
            }).fallbackLanguage(["en", "zh"]).determinePreferredLanguage()
        }, e
    })
}).call(this);