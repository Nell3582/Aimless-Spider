/*
更新时间: 2020-12-12 23:00
赞赏:中青邀请码`46308484`,农妇山泉 -> 有点咸，万分感谢
本脚本仅适用于中青看点极速版领取青豆

获取Cookie方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域
下，运行时间自行配置
2. 获取Cookie方法，可随时更新
 ① 进入app，进入任务中心或者签到一次,即可获取Cookie. 
 ② 阅读一篇文章，获取阅读请求body，
 ③ 同时获取阅读时长，
 ④ 在阅读文章最下面有个惊喜红包，点击获取惊喜红包请求
3.增加转盘抽奖通知间隔，为了照顾新用户，前三次会有通知，以后默认每50次转盘抽奖通知一次，可自行修改❗️ 转盘完成后通知会一直开启
4.非专业人士制作，欢迎各位大佬提出宝贵意见和指导
5.增加每日打卡，打卡时间每日5:00-8:00❗️，请不要忘记设置运行时间，共4条Cookie，请全部获取，获取请注释
6. 支持Github Actions多账号运行，填写'YOUTH_HEADER'值多账号时用'#'号隔开，其余值均用'&'分割  ‼️，当转盘次数为50或者100并且余额大于10元时推送通知

~~~~~~~~~~~~~~~~
Surge 4.0 :
[Script]
中青看点 = type=cron,cronexp=35 5 0 * * *,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js,script-update-interval=0

中青看点 = type=http-request,pattern=https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign),script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js

中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/article\/complete,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true

中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/article\/red_packet,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true

中青看点 = type=http-request,pattern=https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true

~~~~~~~~~~~~~~~~
Loon 2.1.0+
[Script]
# 本地脚本
cron "04 00 * * *" script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, enabled=true, tag=中青看点

http-request https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign) script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js
http-request https:\/\/ios\.baertt\.com\/v5\/article\/complete script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true
http-request https:\/\/ios\.baertt\.com\/v5\/article\/red_packet script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true
http-request https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true
-----------------
QX 1.0. 7+ :
[task_local]
0 9 * * * youth.js

[rewrite_local]
https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign) url script-request-header youth.js

https?:\/\/ios\.baertt\.com\/v5\/article\/complete url script-request-body youth.js

https:\/\/ios\.baertt\.com\/v5\/article\/red_packet url script-request-body youth.js

https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json url script-request-body youth.js


~~~~~~~~~~~~~~~~
[MITM]
hostname = *.youth.cn, ios.baertt.com 
~~~~~~~~~~~~~~~~

*/

let s = 200 //各数据接口延迟
const $ = new Env("中青看点")
let notifyInterval = $.getdata("notifytimes")||50 //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
const YOUTH_HOST = "https://kd.youth.cn/WebApi/";
const notify = $.isNode() ? require('./sendNotify') : '';
//const zqCookieNode = $.isNode() ? require('./zqCookies.js') : '';
let logs = $.getdata('zqlogs')||false, rotaryscore=0,doublerotary=0,signresult; 
let cookiesArr = [], signheaderVal = '',
    readArr = [], articlebodyVal ='',
    timeArr = [], timebodyVal = '',
    redpArr = [], redpbodyVal = '',
    detail = ``, subTitle = ``;

let CookieYouth =[
'{"X-Requested-With":"XMLHttpRequest","Connection":"keep-alive","Accept-Encoding":"gzip, deflate, br","Content-Type":"application/x-www-form-urlencoded","Origin":"https://kd.youth.cn","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2246366889%22%2C%22%24device_id%22%3A%221720d24c659a23-03f9b6d6e568c4-724c1351-370944-1720d24c65a1147%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%221720d24c659a23-03f9b6d6e568c4-724c1351-370944-1720d24c65a1147%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1591606823,1591606833,1594107921,1594108077; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1589358673,1589358748,1589359001,1590415318","Host":"kd.youth.cn","Referer":"https://kd.youth.cn/html/taskCenter/index.html?uuid=44e514b8c81b6448bbdda59dc7d8022b&sign=13aab674074f6bf29ce9918a447495ca&channel_code=80000000&uid=46366889&channel=80000000&access=WIfI&app_version=1.7.6&device_platform=iphone&cookie_id=922bad827b2fe72798f2e32c7ae353dd&openudid=44e514b8c81b6448bbdda59dc7d8022b&device_type=1&device_brand=iphone&sm_device_id=20200513161155a2fa3f0e12281efbce2df867ae6af2c1010ee7100121ac90&version_code=176&os_version=13.4&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejlq-bsWSxzZtthoyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupY7Knn7OFjJiXrs-2apqGcXY&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejlq-bsWSxzZtthoyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupY7Knn7OFjJiXrs-2apqGcXY&cookie_id=922bad827b2fe72798f2e32c7ae353dd","Accept-Language":"zh-cn","Accept":"*/*","Content-Length":"297"}',
'{"Content-Type":"application/x-www-form-urlencoded","Accept-Encoding":"gzip, deflate, br","Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2253046866%22%2C%22%24device_id%22%3A%221770fdd4654376-0cd46caa8efb51-754c1451-370944-1770fdd4655afb%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%221770fdd4654376-0cd46caa8efb51-754c1451-370944-1770fdd4655afb%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1610878896; sajssdk_2019_cross_new_user=1","Connection":"keep-alive","Accept":"*/*","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Referer":"https://kd.youth.cn/html/taskCenter/index.html?uuid=72c368f1c842c7ee64dd935cef8e2cef&sign=c6e78a360fa0549f00df2645d21e1825&channel_code=80000000&uid=53046866&channel=80000000&access=WIfI&app_version=1.8.2&device_platform=iphone&cookie_id=481d6ad9d1fc075fde77911ca2358d01&openudid=72c368f1c842c7ee64dd935cef8e2cef&device_type=1&device_brand=iphone&sm_device_id=20210117174702dc03d4fe2a3786e8c335094d6a1a1f930154097f25a73432&device_id=49053187&version_code=182&os_version=14.3&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOw3XVphaKcmK_OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonrdsKnEZ4N5jWyEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOw3XVphaKcmK_OqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonrdsKnEZ4N5jWyEY2Ft&cookie_id=481d6ad9d1fc075fde77911ca2358d01","Accept-Language":"zh-cn","X-Requested-With":"XMLHttpRequest"}',
'{"Accept":"*/*","X-Requested-With":"XMLHttpRequest","Accept-Language":"zh-cn","Accept-Encoding":"gzip, deflate, br","Content-Type":"application/x-www-form-urlencoded","Origin":"https://kd.youth.cn","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Connection":"keep-alive","Referer":"https://kd.youth.cn/html/taskCenter/index.html?uuid=72c368f1c842c7ee64dd935cef8e2cef&sign=caabe69e9b6a8f107b11eff35b7292c1&channel_code=80000000&uid=53046201&channel=80000000&access=WIfI&app_version=1.8.2&device_platform=iphone&cookie_id=033aa39f67ec64c5183f86e84012e25a&openudid=72c368f1c842c7ee64dd935cef8e2cef&device_type=1&device_brand=iphone&sm_device_id=20210117174702dc03d4fe2a3786e8c335094d6a1a1f930154097f25a73432&device_id=49053187&version_code=182&os_version=14.3&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66rpWKxzX2whIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLC3dW2Fso6ar6m6apqGcXY&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66rpWKxzX2whIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLC3dW2Fso6ar6m6apqGcXY&cookie_id=033aa39f67ec64c5183f86e84012e25a","Content-Length":"297","Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2253046201%22%2C%22%24device_id%22%3A%221770fbe0c099aa-0518affe903e318-754c1451-370944-1770fbe0c0a9f8%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%221770fbe0c099aa-0518affe903e318-754c1451-370944-1770fbe0c0a9f8%22%7D; sajssdk_2019_cross_new_user=1"}',
]

let REDBODYs = [
'p=9NwGV8Ov71o%3DgW5NEpb6rjazbBlBp4-3VBqIE6FTR2KhfyLVi7Pl1_m0wwPJgXu-Fmh7S-5HqV6o2kNNfxbTBdHNeGGUACeILyWR3zMN6Iw3IXfZs4Lu-yb9ynQmQje6lCx_IwxRVvI2SNym5MJ3oH5lFqmbtpdkJfwhB1sUJEdEgJ5iEwGnEtnWJDQPgSUh_43T95feCdA6znUBf7UdpUNuu05JsguiVtt7K_tT2UIuuVvof9Ue3GPhbcYOf2RkxK2Lm3EvI0o599EHSz8GOjyzbxSObMbWvZZwgkKHFQXVOzyoQTTWHFLADZSIgWXcViAEHw4v7N4JP82BlQXsKGgv4dNrEf1VdrUKNKxG3N6KDEB01P3CPua6FvVkUbard09CVB7EtXnTKT1tA6PN2ZnC18_44WENRdSnyX0OKFBy1isFDpep83gNvhCLoDvpAGgSJruf8zQD9GhS2XykfsYutxKDLen8fktWSwT5_OwekSn69xKRkyefjQBVGav9W0hJUtOL-MwuerrWpJXzjmMZiz-A-24K-bYLjCnU43GD3wnCYmVhLpAMqSoqxdkeIXTOz98GDS7xJhsXNsGWnl9noOZVMHcgiZGmuELMwt_kepT26mvBWj2mY8XEkYfGZB_l7BGgBKJj3rZwVZm-yEHoO7ZCEZo6LKP9p4m69bTYtUPXC7Ekp78_MKieZRMKyu_BeaURSSJmGPsVirO9onrMGwr1s7qZlr2Qr0QUsXEMd0mB-g4VO-hVocAezEqoQ1oYy48nNMBkKoSPpYSDZ_o6cMBfTpdLvkU6dy5xhbRWyrtSZB94xt0PjsuNWvU7KjiZNfij52VwKkAGVal0qPPtlfZVKXRrbA%3D%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjazbBlBp4-3VBqIE6FTR2KhfyLVi7Pl1_m0wwPJgXu-Fmh7S-5HqV6o1vMtEls8mPJh514T6M7mT424qvh8QrkxvplMO-SYOVD8eel3ty7vwxe_wa7ZfSZfXdjTiw3cbhIZT-OnIao6ZrF_hSdmQipG4Rvvz3nXQ6gK5CyHYI1D1-baeHBTpn7ijSSnjFXoXswynYfcRFREAK6HrLDYDIdu0oZIh0YNKqAVdXUyBTfE6kd6fc5T-hlFBv2LCI_iiLt9NSTeaGPX5E7QZ-3UBGxfQhaM577hsZs9F6gLr6zAiaip3_bx9APCAzfrdfUqaLKWJL3n-5JMkNWuLm9bMAR5ttUQ5kgUKNaDiXBMBILe-HPAEeZCjdjuNgV1-VfFstvEMl0g13vDwaMeBXY_-yie9XGrPEHDWApBYYniaZPOvUpc9r0RvdlRq7ArPvpTqM_eJ_Z50oa9pk6vcgpzMb821MjFD63LkQv9V4TEYyFznawlUhOQBg6tpO9pjzOaprXcZH4wzm_MXcPGEAGgNHrKDsVAhie2ql9-jLn5PhTrXOkLBWKAC19h7InJaQpyyzwakY8qiV6dpDfO845HeBGsK_XKD_GcKeG8mVhbJR3QFYauUNVGz_VQs7rA7wGFlpc7lq00wY5R6_69uR5NpV1DuusgsOpD48A_fMx4skEceX_vhMWnHhjbCXqBw8fTBrhDZoHjV1bpF2QauEgg4vQdroH1YDRfqoaWkNWtZpNmB7F0lip9nB_W81JMmJvnv2cWWqhriW8-R7D2Tj8MIsHAHg3Xx6-otIcOfyub87cJEV3a1brx2ld6DtlxWkkG95EGWy5Gp-Zfkw%3D%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjazbBlBp4-3VBqIE6FTR2KhfyLVi7Pl1_m0wwPJgXu-Fmh7S-5HqV6o1vMtEls8mPJh514T6M7mT424qvh8QrkxvplMO-SYOVD8eel3ty7vwxe_wa7ZfSZfXdjTiw3cbhIZT-OnIao6ZrF_hSdmQipG4Rvvz3nXQ6gK5CyHYI1D1-baeHBTpn7ijSSnjFXoXswynYfcRFREAK6HrLDYDIdu0oZIh0YNKqAVdXUyBTfE6kd6fc5T-hlFBv2LCI_iiLt9NSTeaGPX5E7QZ-3UBGxfQhaM577hsZs9F6gLr6zAiaip3_bx9APCAzfrdfUqaLKWJL3n-5JMkNWuLm9bMAR5ttUQ5kgUKNaDiXBMBILe-HPAEeZCjdjuNgV1-VfFstvEMl0g13vDwaMeBXY_-yie9XGrPEHDWApBYYniaZPOvUpc9r0RvdlRq7ArPvpTqM_eJ_Z50oa9pk6vcgpzMb821MjFD63LkQv9V4TEYyFznawlUhOQBg6tpO9pjzOaprXcZH4wzm_MXcPGEAGgNHrKVAPuemipaHgwDN-_jfIcJfH7ccvWxsyv3fp3_fkWpSglU30uBHpA5uulOWeJLzI6T0OMP6sYvsIu2IxqHkdSLf8600pVQGiyrClAOCxQazKlFbdJgWT57lSdsW--y51Ax_l__dGWM8LcKWzIZ4XOn_DQ9dgYIKdChVm6OpttWOVfoN4pH34zD6pgkfcI-RmmuJOZzdeRB8MWIyYJYp0PCRt6e2BRG4XbVYyDaNakfkJv3R2oge6Uokdn2UiJOD8UQ-77iROFq83jDoFlz59lycBdzv0_-FhGm3wj3hihyeMD0ywwl6mzQg%3D%3D',
]

let ARTBODYs =[
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONmX9yDzh9viCys70pKCUuRrHMvec1dbf9in75vpmfRUgmDkIOIwmaDUdhG4A54HpMWDheruvLzPv_rPGu2Q9AFB4yDkWIoXwVphhPwsJlyeW6FpaILrvt_IAJarZJ6U4YhgWffkXZ0HLt0nTU-UB0NsK6rsVDjEy1qebHzCwfkXSh3ToP8zn1_g2AjH69qD2DrZvCavkUBMl09tZcd9I2GmyxCBI_o4kHaKPPyonpr8xM2ceK2a4tcsFqNCV4vsak1qmC3ghKH15aZSJy9wXVEX76Yaj4NYMcVi7t2eppd4nrdgfHeHis51a2dEPzSpUZ-cpnQCh1_3oupvSjzIljwL7YZEGXSVj044lgEpsCDy8uVKwG0p0j_iSAj8WTTJEjWP0Lzg961AP1D6wUd5khzGyE_qSMXBSotksVX6bQVjrflfYo_zBT0HJOijXRHMOtCdoSVec_PJiQT9OUAzYTEGeMdAJppziUOmt0OYlnbZGIWCwertWF86JeUY8wNMKmPDRLrSHXIHiUr7i7mICcTftRAK8FLpyaWjuW6MKNQOJbEfwIf-1t0vLMHHV2PHekl5Qte7whJ1ETspo4I07OCupt7A2njxtd7zj9v3bz5CBmdD2_5jrQ5oohj8bajinQrpqfBf8mbAG6UYKlQsp20u8PdsfIGmn8Lo1H4beNCltA%3D%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZA4LYK-zPANFjqRCwIjF9EEH7Kj7IudQYQD2OtIaZ_4Q5iaJIQgZGbpyURKdxm82vJFjI7CttJ649cgA-Nl0bB65gb7GBt3nXFoBtmaK7UuNbwoOedlFmrhMwDRB3U-S5p_M46c9pOov2ZD9XjH4vMi7_opBwkQ2jaReAI3kG03zWqz1imHcZwl36cMuXeW7jcIecQwnlc3CjXbKfDYHR-c_d3a-GgPZ3u3su7E0JGXj44dxS4cZRXVdeJW975BmKJxfjCN9fLd4GF7MSpLF5r6DcZ1zw2gJBfSyrfX5v21P1ZAUCXvCRkvRn7OWOg-IfTA5pkAyhDqFNeoAZ69yH_1pYwt7QT-eZpxIQyevKEBfmNeffgDIN4bEZzRs1rJ8kLkBXJPemTXxD82Gn9jXpf8RZjERp1oO4xuL7NBWqOwmM7x-ZTZeW1gjvi3mgJP78qbTjCx-uStrWDw4cgLmMYuWeGozEQrVtSWpdq-byYr99Ngwwd5fh2r86Q2Fom9fxlljsXkw78Va-oqZ8kHnu9LTgsBEhSlbGNJcU-JlWlBEuT9gs7f2MI5yfxxAJHGGZwLfGuJAIX2l0G9ecj4U7nxZQhOxQqjC0LY4sH12k1kGfbmLgkZR5y9GEIMO7sAy7609IPFspVCtK_tTsL6NH-RX_cb4rsmfNHYosAmi8R2iw%3D%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZA4LYK-zPANFjqRCwIjF9EEH7Kj7IudQYQD2OtIaZ_4Q5iaJIQgZGbpyURKdxm82vJFjI7CttJ649cgA-Nl0bB65gb7GBt3nXFoBtmaK7UuNbwoOedlFmrhMwDRB3U-S5p_M46c9pOov2ZD9XjH4vMi7_opBwkQ2jaReAI3kG03zWqz1imHcZwl36cMuXeW7jcIecQwnlc3CjXbKfDYHR-c_d3a-GgPZ3u3su7E0JGXj44dxS4cZRXVdeJW975BmKJxfjCN9fLd4GF7MSpLF5r6DcZ1zw2gJBfSyrfX5v21P1ZAUCXvCRkvRn7OWOg-IfTA5pkAyhDqFNeoAZ69yH_1pYwt7QT-eZpxIQyevKEBfmNeffgDIN4bEZzRs1rJ8kLkBXJPemTXxD82Gn9jXpf8RZjERp1oO4xuL7NBWqOwmM7x-ZTZeW1gjvi3mgJP78qbTjCx-uStrWDw4cgLmMYuWeGozEQrVtSWpdq-byYr99Ngwwd5fh2r86Q2Fom9fxlljsXkw78Va-oqZ8kHnu9LTgsBEhSlbGNJcU-JlWlBEuT9gs7f2MI5yfxxAJHGGZwLfGuJAIX2l0G9ecj4U7nxZQhOxQqjC0LY4sH12k1kGfbmLgkZR5y9GEIMO7sAy7609IPFspVCtK_tTsL6NH-RX_cb4rsmfNHYosAmi8R2iw%3D%3D',
]

let READTIME = [
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONmX9yDzh9viCys70pKCUuRrHMvec1dbf9in75vpmfRUgmDkIOIwmaDUdhG4A54HpMWDheruvLzPv_rPGu2Q9AFB4yDkWIoXwVo2XvtXYF6lnhT4HfLLzsNUjIjXlI7CGaf_dcxME_x9bmYg2o2wOAgeIVJ9PGB_xffMaz56FxkBvAL9C3Is-slMjCtOoHFY3rYmnh27uf0kAOJZcDhDAZb1Q1oyqOlQB7pLZLxtScm0Y8BDiact0jpPZweI7gvep3sbATkPqDs9nEImOJ90Kp-tFJPHTdZImSBFPV8VZjAn0C4XfOW6cLclMaw3YKrXUEOKjwD9BC_5j12gJpOsHI_gRYyoQ6dCOMaO-qsMhffqhaaxpCQkTTmGLLyb16ui_xzgWSeoUBOomb3igcdtRQVYAGatMYP-KJWNSec4wwelnTSJK8_SQzwpPBcL4OajenJ5gk0_77wh6OacOv_Wgf8_lrcwQ8t_xmq_kUNQOOUV70Dg1dqV0VaZc9ynAl1HfwGv8GCdz76DhN7XBWkoJ16yBZRQOgOOrG-66wHEKu7Kte7vK92RupSgqdRILcNwNB9vkQrB75yAPHLNV_BtEwj3XsaE1XXi_-l7W5U1i9mdRKgIEcBIWrFRQ_NeV55ZA80POgVVmTfqG_Y40wjLlLbZqMsMMFUigds%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZA4LYK-zPANFjqRCwIjF9EEH7Kj7IudQYQD2OtIaZ_4Q5iaJIQgZGbpyURKdxm82vJFjI7CttJ649cgA-Nl0bB65gb7GBt3nXEzjE-AKmGdQzaFVCp5T4exgNOtCkUFQa9T6DxO8TN5km4BQXhhFefz0gSiP_pCMORD_wHuHfq3eRTiERbtdY9UOtnNE9pc1lwxk5vD7xqf5RwNgITuRVtwvD4NTMhmsZcd7J-vGoU8qL676fmQlY5PdYZwuqCbEWKjjwckM42GitEb56rEguCTAYNZl61H5PcWxKgvhlFTpDNnwtSVD6dQo7gIUsnBaSkhhpZWTbS1iL2ibfy-HvKVxEQPR9iatB7xppvpa6FbK2UrO49lf1yamvX8QxoJao7H26Iz87kdZ7cqwpTIVKVo07wvwvRMYIi60huaEQp4KFlpfpxCXtxdUVHD-YUlyyEISgVW1Ljtum4kcl_v4piOo312vyiVMB_0xvfr3E1SIpXxK99qmwgRHEXnyTZV78TqP4JleFFkCgwagVx91cIxXgQkMIInYhY3sCgBwA6HAOGaGlHgBEYgIQ6HNxEY8gvBPP2seRYnqzps4Ckxmg8bUUd3rX73Af9EoijyfS63UKexOn5KrIw-DjzfrYbtlxFQpvsZSz-Tl22vjvvLC3PooUFqsHrJn9c%3D',
'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZA4LYK-zPANFjqRCwIjF9EEH7Kj7IudQYQD2OtIaZ_4Q5iaJIQgZGbpyURKdxm82vJFjI7CttJ649cgA-Nl0bB65gb7GBt3nXEzjE-AKmGdQzaFVCp5T4exgNOtCkUFQa9T6DxO8TN5km4BQXhhFefz0gSiP_pCMORD_wHuHfq3eRTiERbtdY9UOtnNE9pc1lwxk5vD7xqf5RwNgITuRVtwvD4NTMhmsZcd7J-vGoU8qL676fmQlY5PdYZwuqCbEWKjjwckM42GitEb56rEguCTAYNZl61H5PcWxKgvhlFTpDNnwtSVD6dQo7gIUsnBaSkhhpZWTbS1iL2ibfy-HvKVOAkywO1S7vM9FLKGXmQrlMX5vp6Ttd7Jc8PhLjSuC6PSb69c91e1Wy3NkgrsSW75NpqBgpHxn4Q35N0YE1PKB0Az2RmODP1FXMmKXBLs6Rk1aYHzC6NBlbySWRUMW7XNIgcM6q2LIhir61Oe0g6eC5e5PH4W86KhB7RBh7rvbn1xdfxPbEzZ-0dgCiQ23jqNb0Ftp0UeJSBimiZhDvGB6M9JTbVJAp4hW7NLLsbzGq5qd_0NHEn1ZeES88is5TCO_UTfQdLid_o0iirhG3KmBT0KT5JG1UC3bBafmF0E_QMnp08v6w1C7JMjDS3xtIekR38nJAM9ses%3D',
]
//环境判断,并取相应的Ck值到列表,适用于多账号环节
if ($.isNode()) {
    Object.keys(CookieYouth).forEach((item) => {
        if (CookieYouth[item]) {
          cookiesArr.push(CookieYouth[item])
        }
      })
    Object.keys(ARTBODYs).forEach((item) => {
        if (ARTBODYs[item]) {
          readArr.push(ARTBODYs[item])
        }
      })
    Object.keys(REDBODYs).forEach((item) => {
        if (REDBODYs[item]) {
          redpArr.push(REDBODYs[item])
        }
      })
    Object.keys(READTIME).forEach((item) => {
        if (READTIME[item]) {
          timeArr.push(READTIME[item])
        }
      })
      console.log(`============ 共${cookiesArr.length}个中青账号  =============\n`)
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
    } else {
    cookiesArr.push($.getdata('youthheader_zq'));
    redpArr.push($.getdata('red_zq'));
    readArr.push($.getdata('read_zq'));
    timeArr.push($.getdata('readtime_zq'));
}


const firstcheck = $.getdata('signt');
const runtimes = $.getdata('times');
const opboxtime = $.getdata('opbox');

if (isGetCookie = typeof $request !== 'undefined') {
   GetCookie();
   $.done()
} 

 !(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取中青看点一cookie')
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      signheaderVal = cookiesArr[i];
      articlebodyVal = readArr[i];
      timebodyVal = timeArr[i];
      redpbodyVal = redpArr[i];
      $.index = i + 1;
      console.log(`-------------------------\n\n开始【中青看点${$.index}】`)
    }
  await sign();
  await signInfo();
  await friendsign();
if($.time('HH')>12){
  //await punchCard()
};
if ($.isNode()&& $.time('HH')>20&&$.time('HH')<22){
  await endCard();
  }
else if ($.time('HH')>4&&$.time('HH')<8){
  await endCard();
  }
  await SevCont();
  await comApp();
  await ArticleShare();
  await openbox();
  await getAdVideo();
  await gameVideo();
  await readArticle();
  await Articlered();
  await readTime();
for ( k=0;k<5;k++){
 console.log("等待5s进行下一次任务")
  await $.wait(5000);
  await rotary();
if (rotaryres.status == 0) {
      rotarynum = ` 转盘${rotaryres.msg}🎉`;
      break
   } else if(rotaryres.status == 1){
      rotaryscore += rotaryres.data.score
     rotarytimes = rotaryres.data.remainTurn
  }
 if (rotaryres.status == 1 && rotaryres.data.doubleNum !== 0) {
              await TurnDouble();
           if (Doubleres.status == 1) {
              doublerotary += Doubleres.data.score
           }
      }
}
if (rotaryres.status == 1) {
  detail += `【转盘抽奖】+${rotaryscore}个青豆 剩余${rotaryres.data.remainTurn}次\n`
}
if (rotaryres.status !== 0&&rotaryres.data.doubleNum !== 0){
  detail += `【转盘双倍】+${doublerotary}青豆 剩余${rotaryres.data.doubleNum}次\n`
}
  await rotaryCheck();
  await earningsInfo();
  await showmsg();
  if ($.isNode()&&rotaryres.code !== '10010')
    if( rotarytimes && (100-rotarytimes)%95 == 0 && cash >= 10){
       await notify.sendNotify($.name + " " + nick, "您的余额约为"+cash+"元，已可以提现"+'\n'+`【收益总计】${signinfo.data.user.score}青豆  现金约${cash}元\n${detail}`)
    }
 }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function GetCookie() {
   if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/TaskCenter\/(sign|getSign)/)) {
   const signheaderVal = JSON.stringify($request.headers)
    if (signheaderVal)        $.setdata(signheaderVal,'youthheader_zq')
    $.log(`${$.name} 获取Cookie: 成功,signheaderVal: ${signheaderVal}`)
    $.msg($.name, `获取Cookie: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/article\/complete/)) {
   const articlebodyVal = $request.body
    if (articlebodyVal)        $.setdata(articlebodyVal,'read_zq')
    $.log(`${$.name} 获取阅读: 成功,articlebodyVal: ${articlebodyVal}`)
    $.msg($.name, `获取阅读请求: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/v5\/user\/app_stay/)) {
   const timebodyVal = $request.body
    if (timebodyVal)        $.setdata(timebodyVal,'readtime_zq')
    $.log(`${$.name} 获取阅读: 成功,timebodyVal: ${timebodyVal}`)
    $.msg($.name, `获取阅读时长: 成功🎉`, ``)
  }
else if ($request && $request.method != `OPTIONS`&& $request.url.match(/\/article\/red_packet/)) {
   const redpbodyVal = $request.body
    if (redpbodyVal)        $.setdata(redpbodyVal, 'red_zq')
    $.log(`${$.name} 获取惊喜红包: 成功,redpbodyVal: ${redpbodyVal}`)
    $.msg($.name, `获取惊喜红包请求: 成功🎉`, ``)
  }
 }

function sign() {
    return new Promise((resolve, reject) => {
        const signurl = {
            url: 'https://kd.youth.cn/TaskCenter/sign',
            headers: JSON.parse(signheaderVal),
        }
        $.post(signurl, (error, response, data) => {
            signres = JSON.parse(data)
        const date =  $.time(`MMdd`)
            if (signres.status == 2) {
                signresult = `签到失败，Cookie已失效‼️`;
                $.msg($.name, signresult, "");
                return;
            } else if (signres.status == 1) {
                 signresult = `【签到结果】成功 🎉 明日+${signres.nextScore} `
                //detail = `【签到结果】成功 🎉 青豆: +${signres.score}，明日青豆: +${signres.nextScore}\n`
                // $.setdata(1,'times')
              if(firstcheck==undefined||firstcheck!=date){
                // $.setdata(date,'signt');
              }
            } else if (signres.status == 0) {
                signresult = `【签到结果】重复`;
                detail = "";
              if(runtimes!==undefined){
              // $.setdata(`${parseInt(runtimes)+1}`,'times')  
              }
            }
           resolve() 
        })
    })
}
      
function signInfo() {
    return new Promise((resolve, reject) => {
        const infourl = {
            url: 'https://kd.youth.cn/TaskCenter/getSign',
            headers: JSON.parse(signheaderVal),
        }
        $.post(infourl, (error, response, data) => {
            signinfo = JSON.parse(data);
            if (signinfo.status == 1) {
              cash = signinfo.data.user.money
                subTitle = `【收益总计】${signinfo.data.user.score}青豆  现金约${cash}元`;
                nick = `账号: ${signinfo.data.user.nickname}`;
                detail = `${signresult}(今天+${signinfo.data.sign_score}青豆) 已连签${signinfo.data.sign_day}天`;
               detail +='\n<本次收益>：\n'
            } else {
                subTitle = `${signinfo.msg}`;
                detail = ``;
            }
            resolve()
        })
    })
}

//开启打卡
function punchCard() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `${YOUTH_HOST}PunchCard/signUp?`,
            headers: JSON.parse(signheaderVal),
        }
        $.post(url, (error, response, data) => {
            punchcardstart = JSON.parse(data);
            if (punchcardstart.code == 1) {
                detail += `【打卡报名】打卡报名${punchcardstart.msg} ✅ \n`;
                $.log("每日报名打卡成功，报名时间:"+`${$.time('MM-dd HH:mm')}`)
                resolve();
            }
          else {
            //detail += `【打卡报名】${punchcardstart.msg}\n`
          // $.log(punchcardstart.msg)
            resolve()
          }
        })
    })
}

//结束打卡
function endCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
              url: `${YOUTH_HOST}PunchCard/doCard?`,headers: JSON.parse(signheaderVal),
            }
            $.post(url,async(error, response, data) => {
                punchcardend = JSON.parse(data)
                if (punchcardend.code == 1) {
                    detail += `【早起打卡】${punchcardend.data.card_time}${punchcardend.msg}✅\n`
                   $.log("早起打卡成功，打卡时间:"+`${punchcardend.data.card_time}`)
                   await Cardshare();
                } else if (punchcardend.code == 0) {
                    // TODO .不在打卡时间范围内
                    //detail += `【早起打卡】${punchcardend.msg}\n`
                //   $.log("不在打卡时间范围内")
                }
                resolve()
            })
        },s)
    })
}
//打卡分享
function Cardshare() {
    return new Promise((resolve, reject) => {
        const starturl = {
            url: `${YOUTH_HOST}PunchCard/shareStart?`,
            headers: JSON.parse(signheaderVal),
        }
        $.post(starturl, (error, response, data) => {
            sharestart = JSON.parse(data)
            //detail += `【打卡分享】${sharestart.msg}\n`
            if (sharestart.code == 1) {
                setTimeout(() => {
                    let endurl = {
                        url: `${YOUTH_HOST}PunchCard/shareEnd?`,
                        headers: JSON.parse(signheaderVal)
                    }
                    $.post(endurl, (error, response, data) => {
                        shareres = JSON.parse(data)
                        if (shareres.code == 1) {
                            detail += `+${shareres.data.score}青豆\n`
                        } else {
                            //detail += `【打卡分享】${shareres.msg}\n`
                         //$.log(`${shareres.msg}`)
                        }
                        resolve()
                    })
                  },s*2);
            }
        })
    })
}

function SevCont() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $.post({url: `${YOUTH_HOST}PunchCard/luckdraw?`,
              headers: JSON.parse(signheaderVal),
            }, async(error, response, data) => {
                sevres = JSON.parse(data)
                if (sevres.code == 1) {
          
                    detail += `【七日签到】+${sevres.data.score}青豆 \n`
          
                }else if (sevres.code == 0){
                     //detail += `【七日签到】${sevres.msg}\n`
                   // $.log(`${boxres.msg}`)
                }
                resolve()
            })
        },s)
    })
}

function ArticleShare() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `https://focu.youth.cn/article/s?signature=0Z3Jgv96wqmVPeM7obRdNpHXgAmRhxNPJ6y4jpGDnANbo8KXQr&uid=46308484&phone_code=26170a068d9b9563e7028f197c8a4a2b&scid=33007686&time=1602937887&app_version=1.7.8&sign=d21dd80d0c6563f6f810dd76d7e0aef2`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, async(error, response, data) => {
                //boxres = JSON.parse(data)
                resolve()
            })
        },s)
    })
}


//开启时段宝箱
function openbox() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `${YOUTH_HOST}invite/openHourRed`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, async(error, response, data) => {
                boxres = JSON.parse(data)
                if (boxres.code == 1) {
                  boxretime = boxres.data.time
                  // $.setdata(boxretime, 'opbox')
                    detail += `【开启宝箱】+${boxres.data.score}青豆 下次奖励${boxres.data.time / 60}分钟\n`
                      await boxshare();
                }else{
                    //detail += `【开启宝箱】${boxres.msg}\n`
                   // $.log(`${boxres.msg}`)
                }
                resolve()
            })
        },s)
    })
}

//宝箱分享
function boxshare() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `${YOUTH_HOST}invite/shareEnd`,
                headers: JSON.parse(signheaderVal),
            }
            $.post(url, (error, response, data) => {
   
                shareres = JSON.parse(data)
                if (shareres.code == 1) {
                    detail += `【宝箱分享】+${shareres.data.score}青豆\n`
                }else{
                    //detail += `【宝箱分享】${shareres.msg}\n`
                  //$.log(`${shareres.msg}`)
                }
                resolve()
            })
        },s*2);
    })
}

function friendsign(uid) {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/WebApi/ShareSignNew/getFriendActiveList`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, async(error, response, data) => {
            let addsign = JSON.parse(data)
            if (addsign.error_code == "0"&& addsign.data.active_list.length>0) {
             friendsitem = addsign.data.active_list
             for(friends of friendsitem){
            if(friends.button==1){
               await friendSign(friends.uid)
              }
             }
            }
           resolve()
        })
    })
}


function friendSign(uid) {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/WebApi/ShareSignNew/sendScoreV2?friend_uid=${uid}`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, (error, response, data) => {
            friendres = JSON.parse(data)
            if (friendres.error_code == "0") {
                //detail += `【好友红包】+${friendres.score}个青豆\n`
               console.log(`好友签到，我得红包 +${friendres.score}个青豆`)
            }
            resolve()
        })
    })
}


//看视频奖励
function getAdVideo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://kd.youth.cn/taskCenter/getAdVideoReward`,
            headers: JSON.parse(signheaderVal),
            body: 'type=taskCenter'
        }
        $.post(url, (error, response, data) => {
            adVideores = JSON.parse(data)
            if (adVideores.status == 1) {
                detail += `【观看视频】+${adVideores.score}个青豆\n`
            }
            resolve()
        })
    })
}
// 激励视频奖励
function gameVideo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/Game/GameVideoReward.json`,
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
            gameres = JSON.parse(data)
            if (gameres.success == true) {
                detail += `【激励视频】${gameres.items.score}\n`
            }else{
                if(gameres.error_code == "10003"){
                    //detail += `【激励视频】${gameres.message}\n`
                }
            }
            resolve()
        })
    })
}
function comApp() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/mission/msgRed.json`,
            headers: {
            'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)'
            },
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
            redres = JSON.parse(data)
            if (redres.success == true) {
                detail += `【回访奖励】+${redres.items.score}个青豆\n`
            }else{
                if(redres.error_code == "100009"){
                    //detail += `【回访奖励】${redres.message}\n`
                }
            }
            resolve()
        })
    })
}

//阅读奖励
function readArticle() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/article/complete.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: articlebodyVal,
        }
        $.post(url, (error, response, data) => {
           readres = JSON.parse(data);
     if (typeof readres.items.read_score === 'number')  {
              detail += `【阅读奖励】+${readres.items.read_score}个青豆\n`;
            } 
    //else if (readres.items.max_notice == '\u770b\u592a\u4e45\u4e86\uff0c\u63621\u7bc7\u8bd5\u8bd5') {
              //detail += `【阅读奖励】看太久了，换1篇试试\n`;
         //  $.log(readres.items.max_notice)}

            resolve()
        })
    })
}
//惊喜红包
function Articlered() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/article/red_packet.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: redpbodyVal,
        }
        $.post(url, (error, response, data) => {
            redres = JSON.parse(data)
            if (redres.success == true) {
                detail += `【惊喜红包】+${redres.items.score}个青豆\n`
            }else{
                if(redres.error_code == "100001"){
                    //detail += `【惊喜红包】${redres.message}\n`
                }
            }
            resolve()
        })
    })
}

function readTime() {
    return new Promise((resolve, reject) => {
        const url = {
            url: `https://ios.baertt.com/v5/user/stay.json`,
            headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            },
            body: timebodyVal,
         }
        $.post(url, (error, response, data) => {
            let timeres = JSON.parse(data)
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60
                detail += `【阅读时长】共计` + Math.floor(readtimes) + `分钟\n`
            } else {
                if (timeres.error_code == 200001) {
                    detail += `【阅读时长】❎ 未获取阅读时长Cookie\n`
                }else{
                    detail += `【阅读时长】❎ ${timeres.msg}\n`
                $.log(`阅读时长统计失败，原因:${timeres.msg}`)
                }
            }
            resolve()
        })
    })
}

//转盘任务
function rotary() {
   const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const time = new Date().getTime()
            const url = {
                url: `${YOUTH_HOST}RotaryTable/turnRotary?_=${time}`,
                headers: JSON.parse(signheaderVal),
                body: rotarbody
            }
            $.post(url,async (error, response, data) => {
                try{
                      rotaryres = JSON.parse(data)
                     } catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
            })
        }, s);
    })
}

//转盘宝箱判断
function rotaryCheck() {
    return new Promise(async(resolve) => {
        if (rotaryres.code == 10010) {
            return resolve();
        }
        let i = 0;
        while (i <= 3) {
            if (100 - rotaryres.data.remainTurn == rotaryres.data.chestOpen[i].times) {
                await runRotary(i + 1)
            }
            i++;
        }
      resolve();
    })
}

//开启宝箱
function runRotary(index) {
    return new Promise((resolve, reject) => {
        const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8] + '&num=' + index;
        const time = new Date().getTime();
        const url = {
            url: `${YOUTH_HOST}RotaryTable/chestReward?_=${time}`,
            headers: JSON.parse(signheaderVal),
            body: rotarbody
        }
        $.post(url, (error, response, data) => {
        const rotaryresp = JSON.parse(data);
            if (rotaryresp.status == 1) {
                detail += `【转盘宝箱${index}】+${rotaryresp.data.score}个青豆\n`;
            }else{
                if(rotaryresp.code == "10010"){
                    detail += `【转盘宝箱${index}】+今日抽奖完成\n`;
                }
            }
            resolve();
        })
    })
}

//转盘双倍奖励
function TurnDouble() {
    const rotarbody = signheaderVal.split("&")[15] + '&' + signheaderVal.split("&")[8]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let time = (new Date()).getTime()
            const url = {
                url: `${YOUTH_HOST}RotaryTable/toTurnDouble?_=${time}`,headers: JSON.parse(signheaderVal),body: rotarbody}
            $.post(url, (error, response, data) => { 
              try{
                Doubleres = JSON.parse(data)
                     } catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
             resolve()
            })
        },s)
    })
}
function earningsInfo() {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `https://kd.youth.cn/wap/user/balance?${JSON.parse(signheaderVal)['Referer'].split("?")[1]}`,
                headers: JSON.parse(signheaderVal),
            }
        $.get(url, (error, response, data) => {
              infores = JSON.parse(data)
                if (infores.status == 0) {
                    detail += `<收益统计>：\n`
                    for (i = 0; i < infores.history[0].group.length; i++) {
                        detail += '【' + infores.history[0].group[i].name + '】' + infores.history[0].group[i].money + '个青豆\n'
                    }
                    detail += '<今日合计>： ' + infores.history[0].score + " 青豆"
                }
                resolve()
            })
        },s)
    })
}
async function showmsg() {
       if (rotaryres.status == 1 && rotarytimes >= 97) {
            $.msg($.name + " " + nick, subTitle, detail)  //默认前三次为通知
        }else if (rotaryres.status == 1 && rotarytimes % notifyInterval == 0) {
        $.msg($.name + " " + nick, subTitle, detail) //转盘次数/间隔整除时通知;
        }else if (rotaryres.code == 10010 && notifyInterval != 0) {
         rotarynum = ` 转盘${rotaryres.msg}🎉`
         $.msg($.name+"  "+nick+" "+rotarynum,subTitle,detail)//任务全部完成且通知间隔不为0时通知;
        } 
     else {
       console.log(`【收益总计】${signinfo.data.user.score}青豆  现金约${cash}元\n`+ detail)
   }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
