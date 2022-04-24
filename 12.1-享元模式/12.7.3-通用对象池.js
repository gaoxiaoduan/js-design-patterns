let objPoolFactory = function (createObjFn) {
  let objPool = [];
  return {
    create() {
      if (objPool.length) {
        return objPool.shift();
      }
      return createObjFn.apply(this, arguments);
    },
    recover(obj) {
      objPool.push(obj);
    },
  };
};

// 测试代码
let iframeFactory = objPoolFactory(function () {
  let iframe = document.createElement("iframe");
  iframe.onload = function () {
    iframe.onload = null; // 防止重复加载
    iframeFactory.recover(iframe);
  };
  return iframe;
});

let iframe1 = iframeFactory.create();
iframe1.src = "http;//www.baidu.com";

let iframe2 = iframeFactory.create();
iframe2.src = "http;//www.wx.com";

setTimeout(function () {
  let iframe3 = iframeFactory.create();
  iframe3.src = "http;//www.163.com";
}, 1000);
