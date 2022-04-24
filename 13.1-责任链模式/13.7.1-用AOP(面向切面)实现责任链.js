Function.prototype.after = function (fn) {
  let self = this;
  return function () {
    let ret = self.apply(this, arguments);
    if (ret === "nextSuccess") {
      return fn.apply(this, arguments);
    }
    return ret;
  };
};

// 测试代码
let fn1 = function () {
  try {
    let i = 1;
    i.fff();
    return "fn1";
  } catch (error) {
    return "nextSuccess";
  }
};
let fn2 = function () {
  try {
    let c = 1;
    c.fff();
    return "fn2";
  } catch (error) {
    return "nextSuccess";
  }
};
let fn3 = function () {
  return "hello fn3";
};

let getFn = fn1.after(fn2).after(fn3);
console.log(getFn()); // hello fn3
