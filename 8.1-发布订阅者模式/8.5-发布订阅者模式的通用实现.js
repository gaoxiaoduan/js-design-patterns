let eventBus = {
  clientList: {},
  // on
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []; // 如果之前没有订阅过，则创建一个新的订阅列表
    }
    this.clientList[key].push(fn);
  },
  // emit
  notify() {
    let key = [].shift.call(arguments);
    let fns = this.clientList[key];
    if (!fns || fns.length === 0) return false;

    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments); // arguments是notify传递的参数
    }
  },
  // off
  remove(key, fn) {
    let fns = this.clientList[key];
    if (!fns) return false;
    if (!fn) {
      // 如果没有传入具体的fn，需要移除所有的订阅者
      fns && (fns.length = 0);
    } else {
      this.clientList[key] = fns.filter((item) => item !== fn);
    }
  },
};

let listen88w = function (price) {
  // 小明订阅了88w的消息
  console.log(`88w的房子,现在价格:${price}`);
};
eventBus.listen("88w", listen88w);

eventBus.listen("99w", function (price) {
  // 小红订阅了99w的消息
  console.log(`99w的房子,现在价格:${price}`);
});

eventBus.notify("88w", "100w了"); // 小明订阅了88w的消息
eventBus.notify("99w", "200w了"); // 小明订阅了88w的消息

eventBus.remove("88w", listen88w);
eventBus.notify("88w", "100w了"); // listen88w函数不会再输出了
eventBus.notify("99w", "200w了"); // 小明订阅了88w的消息