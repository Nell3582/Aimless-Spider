auto();

// var appName = rawInput("", "微视");

launchApp("笑谱推购");
console.show(); //开启日志（悬浮窗权限）
sleep(3000);
var w = device.width,
  h = device.height;
console.setSize(device.width, (device.height / 4) * 2);
setScreenMetrics(720, 1280);

sleep(3000);

var num = 600; 


for (let index = 1; index < num; index++) {

  sleep(2000);
  stime = random(11000, 15000);
  log("开始第" + index + "次阅读,共" + num + "次,本次时长" + stime/1000 + "秒");
  b = random(1, 10);

  if (b % 3 == 0) {
    if(id("like_view").exists()){
        sleep(1000);

        toast("点赞提高活跃度");
        log("随机点赞提高活跃度");
    
        id("like_view").click();
    }
  }
  swipe(device.width / 2, 1000, device.width / 2, 300, 1000);
  sleep(stime);
}
