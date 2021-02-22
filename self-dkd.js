
/*------------------------------提醒信息------------------------------
您输入的初始变量名称为:
['dkd_url', ' dkd_hd', ' dkd_body', 'dkd_tx_url', ' dkd_tx_hd', ' dkd_tx_body']

格式化后您的变量输出为:
['Dkd_Url', 'Dkd_Hd', 'Dkd_Body', 'Dkd_Tx_Url', 'Dkd_Tx_Hd', 'Dkd_Tx_Body']

为统一对于临时数组统一在后面加了_Arr,转变为:
['Dkd_Url_Arr', 'Dkd_Hd_Arr', 'Dkd_Body_Arr', 'Dkd_Tx_Url_Arr', 'Dkd_Tx_Hd_Arr', 'Dkd_Tx_Body']

为统一对于临时取值统一在后面加了_Val,转变为:
['Dkd_Url_Val', 'Dkd_Hd_Val', 'Dkd_Body_Val', 'Dkd_Tx_Url_Val', 'Dkd_Tx_Hd_Val', 'Dkd_Tx_Body']

为统一在Boxjs中的写入与值获取统一在后面加了_Box,转变为:
['Dkd_Url_Box', 'Dkd_Hd_Box', 'Dkd_Body_Box', 'Dkd_Tx_Url_Box', 'Dkd_Tx_Hd_Box', 'Dkd_Tx_Body']

Nodejs 对应的单个值对应为:
 [('dkd_url', 'Dkd_Url_Val'), ('dkd_hd', 'Dkd_Hd_Val'), ('dkd_body', 'Dkd_Body_Val'), ('dkd_tx_url', 'Dkd_Tx_Url_Val'), ('dkd_tx_hd', 'Dkd_Tx_Hd_Val'), ('dkd_tx_body', 'Dkd_Tx_Body_Val')]

Boxjs 对应的单个值对应为:
 [('dkd_url', 'Dkd_Url_Box'), ('dkd_hd', 'Dkd_Hd_Box'), ('dkd_body', 'Dkd_Body_Box'), ('dkd_tx_url', 'Dkd_Tx_Url_Box'), ('dkd_tx_hd', 'Dkd_Tx_Hd_Box'), ('dkd_tx_body', 'Dkd_Tx_Body_Box')]

*/
//------------------------------初始化区域------------------------------
let s = 200 //各数据接口延迟
const JsName = "AppName"//自行修改对应的APP
const $ = new Env(JsName)
let notifyInterval = $.getdata("notifytimes")||50 //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
const notify = $.isNode() ? require('./sendNotify') : '';//通知文件,参照LXK大佬的配置文件
//const JsCookieNode = $.isNode() ? require('./zqCookies.js') : '';
let detail = ``, subTitle = ``, option = {};

//------------------------------用户赋值区------------------------------

//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Url 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Url = ["",];
    
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Hd 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Hd = ["",];
    
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Body 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Body = ["",];
    
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Tx_Url 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Tx_Url = ["",];
    
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Tx_Hd 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Tx_Hd = ["",];
    
//用户填写,该变量适用于NodeJs用户,有几个账号请在双引号中对应填写几个 Dkd_Tx_Body 的值,一个双引号中只可填写一个值,多账号用户请自行添加双引号,不同的值双引号后请用逗号隔开
let Dkd_Tx_Body = ["",];
    
//---------------------------变量定义区,请勿修改-------------------------

let Dkd_Url_Arr = [], Dkd_Url_Val = "";

let Dkd_Hd_Arr = [], Dkd_Hd_Val = "";

let Dkd_Body_Arr = [], Dkd_Body_Val = "";

let Dkd_Tx_Url_Arr = [], Dkd_Tx_Url_Val = "";

let Dkd_Tx_Hd_Arr = [], Dkd_Tx_Hd_Val = "";

let Dkd_Tx_Body_Arr = [], Dkd_Tx_Body_Val = "";

//------------------------------账号信息获取区------------------------------
if ($.isNode()) {
    
    Object.keys(Dkd_Url).forEach((item) => {
        if (Dkd_Url[item]) {
          Dkd_Url_Arr.push(Dkd_Url[item])
        }
      })    
    
    Object.keys(Dkd_Hd).forEach((item) => {
        if (Dkd_Hd[item]) {
          Dkd_Hd_Arr.push(Dkd_Hd[item])
        }
      })    
    
    Object.keys(Dkd_Body).forEach((item) => {
        if (Dkd_Body[item]) {
          Dkd_Body_Arr.push(Dkd_Body[item])
        }
      })    
    
    Object.keys(Dkd_Tx_Url).forEach((item) => {
        if (Dkd_Tx_Url[item]) {
          Dkd_Tx_Url_Arr.push(Dkd_Tx_Url[item])
        }
      })    
    
    Object.keys(Dkd_Tx_Hd).forEach((item) => {
        if (Dkd_Tx_Hd[item]) {
          Dkd_Tx_Hd_Arr.push(Dkd_Tx_Hd[item])
        }
      })    
    
    Object.keys(Dkd_Tx_Body).forEach((item) => {
        if (Dkd_Tx_Body[item]) {
          Dkd_Tx_Body_Arr.push(Dkd_Tx_Body[item])
        }
      })    
    
    console.log(`============ 共${Dkd_Url_Arr.length}个${JsName}账号  =============`)
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============`)
    } else {
    
    Dkd_Url_Arr.push($.getdata('Dkd_Url_Box'));
    
    Dkd_Hd_Arr.push($.getdata('Dkd_Hd_Box'));
    
    Dkd_Body_Arr.push($.getdata('Dkd_Body_Box'));
    
    Dkd_Tx_Url_Arr.push($.getdata('Dkd_Tx_Url_Box'));
    
    Dkd_Tx_Hd_Arr.push($.getdata('Dkd_Tx_Hd_Box'));
    
    Dkd_Tx_Body_Arr.push($.getdata('Dkd_Tx_Body_Box'));
    
}

if (isGetCookie = typeof $request !== 'undefined') {
   GetCookie();
   $.done()
}

//GetCookie函数主要是用于手机用户获取ck,NodeJs用户需要在上方导出值填写进去
function GetCookie() {
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Url_Val = JSON.stringify($request.headers)
        if (Dkd_Url_Val)        $.setdata(Dkd_Url_Val,'Dkd_Url_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Url_Val: ${Dkd_Url_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Hd_Val = JSON.stringify($request.headers)
        if (Dkd_Hd_Val)        $.setdata(Dkd_Hd_Val,'Dkd_Hd_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Hd_Val: ${Dkd_Hd_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Body_Val = JSON.stringify($request.headers)
        if (Dkd_Body_Val)        $.setdata(Dkd_Body_Val,'Dkd_Body_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Body_Val: ${Dkd_Body_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Tx_Url_Val = JSON.stringify($request.headers)
        if (Dkd_Tx_Url_Val)        $.setdata(Dkd_Tx_Url_Val,'Dkd_Tx_Url_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Tx_Url_Val: ${Dkd_Tx_Url_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Tx_Hd_Val = JSON.stringify($request.headers)
        if (Dkd_Tx_Hd_Val)        $.setdata(Dkd_Tx_Hd_Val,'Dkd_Tx_Hd_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Tx_Hd_Val: ${Dkd_Tx_Hd_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
    if ($request && $request.method != `OPTIONS`&& $request.url.match(/替换为该值对应匹配的网址的正则表达式/)) {
        const Dkd_Tx_Body_Val = JSON.stringify($request.headers)
        if (Dkd_Tx_Body_Val)        $.setdata(Dkd_Tx_Body_Val,'Dkd_Tx_Body_Box')
        $.log(`${$.name} 获取Cookie: 成功,Dkd_Tx_Body_Val: ${Dkd_Tx_Body_Val}`)
        $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
    
}
//------------------------------脚本函数区(主体结构区)------------------------------
!(async () => {
    if (!Dkd_Url_Arr[0]) {
        $.msg($.name, '【提示】请先获取${JsName}账号一Cookies')
        return;
    }
    for (let i = 0; i < Dkd_Url_Arr.length; i++) {
        if (Dkd_Url_Arr[i]) {
            
             Dkd_Url_Val = Dkd_Url_Arr[i];   
    
             Dkd_Hd_Val = Dkd_Hd_Arr[i];   
    
             Dkd_Body_Val = Dkd_Body_Arr[i];   
    
             Dkd_Tx_Url_Val = Dkd_Tx_Url_Arr[i];   
    
             Dkd_Tx_Hd_Val = Dkd_Tx_Hd_Arr[i];   
    
             Dkd_Tx_Body_Val = Dkd_Tx_Body_Arr[i];   
    
            $.index = i + 1;
            console.log(`-------------------------\n\n开始【中青看点${$.index}】`)
        }
        //await sign();
        //await signInfo();
        await showMsg();

        //继续写
    }
})()

    .catch((e) => {

        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')

    })

    .finally(() => {

        $.done();

    })

async function showMsg() {
/*
需要根据实际情况加入条件判断,这儿仅提供个模版供参考
async function showmsg() {
       if (condition1) {
            $.msg($.name, subTitle, detail)  
        }else if (condition2) {
            $.msg($.name, subTitle, detail) //转盘次数/间隔整除时通知;
        }else if (condition3) {
            $.msg($.name, subTitle, detail)//任务全部完成且通知间隔不为0时通知;
        } 
     else {
       console.log( detail)
   }
}
*/
   $.msg($.name, subTitle, message, option);

   $.log(`\n${message}\n`);

 }
 
//------------------------------环境配置区,请勿修改------------------------------

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

