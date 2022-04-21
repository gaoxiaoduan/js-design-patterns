let add = function () {
  var a = 0;
  for (var i = 0; i < arguments.length; i++) {
    a += arguments[i];
  }
  return a;
};

let createProxyFactory = function (fn) {
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ",");
    if (cache[args]) {
      return cache[args];
    }
    return (cache[args] = fn.apply(this, arguments));
  };
};

let proxyAdd = createProxyFactory(add);
console.log(proxyAdd(1, 2, 3)); // 6
console.log(proxyAdd(1, 2, 3)); // 6
