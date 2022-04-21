let myImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return function (src) {
    imgNode.src = src;
    ƒ;
  };
})();

let proxyImage = (function () {
  let img = new Image();
  img.onload = function () {
    // 3.当图片加载完成，将图片的src属性设置为真实的图片地址
    myImage.setSrc(img.src);
  };

  return function (src) {
    myImage("/images/loading.gif"); // 1.先给img节点设置一张loading图片
    img.src = src; // 2.再发起真正的图片请求
  };
})();

proxyImage("/images/test.jpg");
