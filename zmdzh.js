
/*------------------------------提醒信息------------------------------
您输入的初始变量名称为:
['zm_url', ' zm_hd', ' zm_body']

格式化后您的变量输出为:
['Zm_Url', 'Zm_Hd', 'Zm_Body']

为统一对于临时数组统一在后面加了_Arr,转变为:
['Zm_Url_Arr', 'Zm_Hd_Arr', 'Zm_Body']

为统一对于临时取值统一在后面加了_Val,转变为:
['Zm_Url_Val', 'Zm_Hd_Val', 'Zm_Body']

为统一在Boxjs中的写入与值获取统一在后面加了_Box,转变为:
['Zm_Url_Box', 'Zm_Hd_Box', 'Zm_Body']

Nodejs 对应的单个值对应为:
 [('zm_url', 'Zm_Url_Val'), ('zm_hd', 'Zm_Hd_Val'), ('zm_body', 'Zm_Body_Val')]

Boxjs 对应的单个值对应为:
 [('zm_url', 'Zm_Url_Box'), ('zm_hd', 'Zm_Hd_Box'), ('zm_body', 'Zm_Body_Box')]

*/
//------------------------------初始化区域------------------------------
let s = 200 //各数据接口延迟
const JsName = "芝麻视频"//自行修改对应的APP
const $ = new Env(JsName)
let notifyInterval = $.getdata("notifytimes") || 50 //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
const notify = $.isNode() ? require('./sendNotify') : '';//通知文件,参照LXK大佬的配置文件
//const JsCookieNode = $.isNode() ? require('./zqCookies.js') : '';
let detail = ``, subTitle = ``, option = {};
var zz = ''

//------------------------------用户赋值区------------------------------

//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Zm_Url 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Zm_Url = ["https://api.sxsjyzm.com/Api2/loot/index"]
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Zm_Hd 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Zm_Hd = [{"wToken": "BYTR_FD7DxmVfOh/K3JtbQyc6tSn/06DQQUy8BovRGuF2UzpH6SZcx+Iye31lb5HFeRjExMU5VxLcecqJzLesvtbsEyGIQFKL3hlTnCPyEdY3WvdZxckrfm9X0tObA4EPGFZ6sQdO7yFki66+lcmQlyOozcw//MT8wU+tmXVgMVKz+q/qzrPPtsKb1W4MbQFS/8oTdujbIEcRV/uWWW3hnF5zshfaJo38X+wu3ietR2ckouGKkJaG0UWKFThwm2KViuXnuQApVc7Q8pLcTh4VPL3NTc5fNrigSVQertYyV1dK/lbUfcaFTEygiSu/ISqS1ci5m+OibzXAAK15IJQhme+zAO/wG2ZrpSm494jxSsqKY0bHNI7M4TJbbVy4XYZCQf43qkGKfto8KhuD4Nje+hR7UiqEhBtfrDu/kt/vp09swDo=&AWER_a001383973525c96aa2b44a21c48dea5d9ef2223698a5", "Host": "api.sxsjyzm.com", "User-Agent": "okhttp/4.8.0", "Cache-Control": "no-cache"},];

//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Zm_Body 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Zm_Body = ["desarr=YAqvuGsuh0VGCCvm3Ox%2FRyb87GZcdOqbXOIw3RHvMSXqSsQYuliEQXxNHJpldeA%2Faz%2F6BOhNNng2WyDH%2BerqmLGY%2BqF41tmzCz1%2BaJkY0zzU2kW31u38cKDV4Dg0m7yioQkbwx2pSXt%2BQK9XhySYN9eVml2J0MXHphHITQHSiNXnFN7rvCBG64dHpL5FKbXgnaLqdgQswt%2FWTlBetK3u346e71R0XEpUPYe5i3OyvZ16XD69zcQlSbjn8XhParQf9TiJ2T4abc%2Fv7pdP2XnRLVt910G99vzsU4zcjEhs%2F7%2FW%2BW02B7Ke%2FgeGqCdppp2PN%2BD&appversion=10",
];

//---------------------------变量定义区,请勿修改-------------------------

let Zm_Url_Arr = [], Zm_Url_Val = "";

let Zm_Hd_Arr = [], Zm_Hd_Val = "";

let Zm_Body_Arr = [], Zm_Body_Val = "";

//------------------------------账号信息获取区------------------------------
if ($.isNode()) {

    Object.keys(Zm_Url).forEach((item) => {
        if (Zm_Url[item]) {
            Zm_Url_Arr.push(Zm_Url[item])
        }
    })

    Object.keys(Zm_Hd).forEach((item) => {
        if (Zm_Hd[item]) {
            Zm_Hd_Arr.push(Zm_Hd[item])
        }
    })

    Object.keys(Zm_Body).forEach((item) => {
        if (Zm_Body[item]) {
            Zm_Body_Arr.push(Zm_Body[item])
        }
    })

    console.log(`============ 共${Zm_Url_Arr.length}个${JsName}账号  =============`)
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============`)
} else {

    Zm_Url_Arr.push($.getdata('Zm_Url_Box'));

    Zm_Hd_Arr.push($.getdata('Zm_Hd_Box'));

    Zm_Body_Arr.push($.getdata('Zm_Body_Box'));

}

if (isGetCookie = typeof $request !== 'undefined') {
    GetCookie();
    $.done()
}

//GetCookie函数主要是用于手机用户获取ck,NodeJs用户需要在上方导出值填写进去
function GetCookie() {

    if ($request && $request.method != `OPTIONS` && $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Zm_Url_Val = JSON.stringify($request.headers)
        if (Zm_Url_Val) $.setdata(Zm_Url_Val, 'Zm_Url_Box')
        $.log(`${$.name} 获取Cookie: 成功,Zm_Url_Val: ${Zm_Url_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
    }

    if ($request && $request.method != `OPTIONS` && $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Zm_Hd_Val = JSON.stringify($request.headers)
        if (Zm_Hd_Val) $.setdata(Zm_Hd_Val, 'Zm_Hd_Box')
        $.log(`${$.name} 获取Cookie: 成功,Zm_Hd_Val: ${Zm_Hd_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
    }

    if ($request && $request.method != `OPTIONS` && $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Zm_Body_Val = JSON.stringify($request.headers)
        if (Zm_Body_Val) $.setdata(Zm_Body_Val, 'Zm_Body_Box')
        $.log(`${$.name} 获取Cookie: 成功,Zm_Body_Val: ${Zm_Body_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
    }

}
//------------------------------脚本函数区(主体结构区)------------------------------
!(async () => {
    if (!Zm_Url_Arr[0]) {
        $.msg($.name, '【提示】请先获取${JsName}账号一Cookies')
        return;
    }
    for (let i = 0; i < Zm_Url_Arr.length; i++) {
        if (Zm_Url_Arr[i]) {

            Zm_Url_Val = Zm_Url_Arr[i];

            Zm_Hd_Val = Zm_Hd_Arr[i];

            Zm_Body_Val = Zm_Body_Arr[i];

            $.index = i + 1;
            console.log(`-------------------------\n\n开始【中青看点${$.index}】`)
        };
        if (typeof $request !== "undefined") {
            await zmck()
        } else {
            await zmum()
            for (let i = 0; i < 30; i++) {
                $.index = i + 1
                console.log(`\n芝嫲视频开始执行第${i + 1}次领取晶石！💦\n等待11秒开始执行下一次领取`)
                await zmsx();
                if (zz == 1) {
                    break;
                }
            } $.msg("", "", '芝嫲视频本轮晶石已全部领取完毕，，等待下次成熟!')
        }
    }
})()
    .catch((e) => {

        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')

    })

    .finally(() => {

        $.done();

    })



//芝嫲视频数据获取
function zmck() {
    if ($request.url.indexOf("index") > -1) {
        $.setdata(JSON.stringify($request.url), 'zmurl')
        $.log(zmurl)
        $.setdata(JSON.stringify($request.headers), 'zmhd')
        $.log(zmhd)
        $.setdata($request.body, 'zmbody')
        $.log(zmbody)
        $.msg($.name, "", "芝嫲视频headers获取成功！")
        $.msg($.name, "", "芝嫲视频body获取成功！")
    }
}



//芝嫲视频获取um     
function zmum(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: 'https://api.sxsjyzm.com/api2/Shortvideo/endDoTask',
            headers: Zm_Hd_Val,
            body: Zm_Body_Val,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if (result.code == 200) {
                    console.log('\n芝嫲激励视频回执:成功🌝 ' + result.mess)
                }
                if (result.code == 190) {

                    console.log('\n芝嫲激励视频回执:失败🚫 ' + result.mess)
                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//芝嫲视频领取晶石     
function zmlq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: 'https://api.sxsjyzm.com/api2/loot/quickgetloot',
            headers: Zm_Hd_Val,
            body: Zm_Body_Val,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if (result.code == 200) {
                    console.log('\n芝嫲视频收取晶石回执:成功🌝 ' + result.mess)
                }
                if (result.code == 1002) {
                    zz = 1

                    console.log('\n芝嫲视频收取晶石回执:失败🚫 ' + result.mess)
                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}



//芝嫲视频刷新
function zmsx(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (typeof Zm_Url_Val === "undefined") {
                $.msg($.name, "", '请先获取芝嫲视频body!😓',)
                $.done()
            }
            let url = {
                url: 'https://api.sxsjyzm.com/api2/loot/index',
                headers: Zm_Hd_Val,
                body: Zm_Body_Val,
            }
            $.post(url, async (err, resp, data) => {
                try {

                    const result = JSON.parse(data)
                    if (result.code == 200) {
                        console.log('\n芝嫲视频刷新回执:成功🌝 ' + result.mess)
                    }
                    if (result.code == 2970) {
                        $.msg('', '', '芝嫲视频回执:失败🚫 ' + result.mess + '请重新获取body')

                    } console.log(`\n芝嫲视频刷新成功,等待11秒开始收取晶石`)
                    await $.wait(11000);
                    await zmlq()

                } catch (e) {
                    //$.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


//------------------------------环境配置区,请勿修改------------------------------

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

