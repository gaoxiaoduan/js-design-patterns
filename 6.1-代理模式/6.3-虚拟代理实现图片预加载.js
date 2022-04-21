/**
 * 在Web开发中，图片预加载是一种常用的技术，如果直接给某个img标签节点设置src属性，由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。
 * 常见的做法是先用一张loading图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到img节点里，这种场景就很适合使用虚拟代理。
 */

let myImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc(src) {
      imgNode.src = src;
    },
  };
})();

let proxyImage = (function () {
  let img = new Image();
  img.onload = function () {
    // 3.当图片加载完成，将图片的src属性设置为真实的图片地址
    myImage.setSrc(img.src);
  };

  return {
    setSrc(src) {
      myImage.setSrc("/images/loading.gif"); // 1.先给img节点设置一张loading图片
      img.src = src; // 2.再发起真正的图片请求
    },
  };
})();

proxyImage.setSrc('/images/test.jpg');
