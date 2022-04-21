function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(1, 2, 3)); // 6

function curring(fn) {
  function curried(...args) {
    // if (args.length >= fn.length) { //newSum(1)(2)(3)
    if (args.length === 0) { // 若想将调用方式改为newSum(1)(2)(3)[ () ]  时调用，将判读条件改为args.length === 0即可
      return fn.apply(this, args);
    } else {
      return function (...argsArray) {
        return curried.apply(this, [...args, ...argsArray]);
      };
    }
  }
  return curried;
}

let newSum = curring(sum);
console.log("[ newSum(1)(2)(3) ] >", newSum(1)(2)(3)); //6
