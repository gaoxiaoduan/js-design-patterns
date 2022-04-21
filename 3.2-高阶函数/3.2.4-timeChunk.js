/**
 * 一个例子是创建WebQQ的QQ好友列表。列表中通常会有成百上千个好友，如果一个好友用一个节点来表示，
 * 当我们在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点。
 * 在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死。
 * 解决方法：timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点
 */

// let ary = [];

// for (let i = 1; i <= 1000; i++) {
//   ary.push(i); // 假设渲染1000条数据
// }

// let renderList = function (data) {
//   for (let i = 0, l = data.length; i < l; i++) {
//     let div = document.createElement("div");
//     div.innerHTML = i;
//     document.body.appendChild(div);
//   }
// };

let timeChunk = function (ary, fn, count) {
  let obj = null,
    timer = null;

  let start = function () {
    for (let i = 0; i < Math.min(ary.length, count || 1); i++) {
      obj = ary.shift();
      fn(obj);
    }
  };

  return function () {
    timer = setTimeout(function () {
      if (ary.length === 0) {
        // 如果全部创建完毕，清除定时器
        return clearTimeout(timer);
      }
      start();
    }, 200); // 分批执行的时间间隔
  };
};
// —————————————测试代码———————————————————
let ary = [];

for (let i = 1; i <= 1000; i++) {
  ary.push(i); // 假设渲染1000条数据
}

let renderList = timeChunk(
  ary,
  function (data) {
    let div = document.createElement("div");
    div.innerHTML = data;
    document.body.appendChild(div);
  },
  8
);
renderList();