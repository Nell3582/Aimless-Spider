launchApp("TIM");
console.show(); //开启日志（悬浮窗权限）
var w = device.width,
  h = device.height;
console.setSize(device.width, (device.height / 4) * 2);
setScreenMetrics(720, 1280);

sleep(3000);

id("relativeItem").findOne().parent().click();
id("ivTitleBtnRightImage").waitFor();
id("ivTitleBtnRightImage").click();
sleep(1500);
id("eor").findOne().parent().click();
log("加载群列表中");
// sleep(15000)
id("tv_name").className("android.widget.TextView").text("简@爱~").waitFor();
log("群列表加载已完成");

for (let index = 1; index < 100; index++) {
  swipe(device.width / 2, 1000, device.width / 2, 300, 1000);
  swipe(device.width / 2, 1000, device.width / 2, 300, 1000);
  sleep(5000);
  sentMessage();
}

function sentMessage() {
  var object = id("h6").untilFind();
  if (!object.empty()) {
    log("找到啦");
    // 遍历用户昵称
    object.forEach(function (currentValue, index) {
      //获取项目索引
      log(index);
      // 获取昵称文本
      let item = currentValue;
      if (item.click()) {
        // 点击列表项
        log(item.click());
        sleep(5000);
        if (id("i82").exists()) {
          id("i82")
            .findOne()
            .setText("打扰了，理工新卡机免费洗澡用水,有需要请加");
          sleep(1000);
          id("ivTitleBtnRightText").findOne().click();
          sleep(3000);
        } else {
          id("ivTitleBtnLeftButton").findOne().click();
        }
      } else {
        log("不可被加好友");
      }
    });
  } else {
    log("没找到╭(╯^╰)╮");
  }
}
