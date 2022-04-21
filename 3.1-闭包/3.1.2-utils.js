var Type = {};

for (var i = 0, type; (type = ["String", "Array", "Number"][i++]); ) {
  (function (type) {
    Type["is" + type] = function (obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
  })(type);
}

// var s = Type.isArray([]); // true
// var s = Type.isString("hello"); // true
var s = Type.isNumber(666); // true

console.log(s);

