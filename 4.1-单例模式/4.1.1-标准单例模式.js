let Singleton = function (name) {
  this.name = name;
  this.instance = null; // 因为此处可以修改instance，不是很完美，可以改为私有属性
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) { // 使用getInstance使得类“不透明”
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
let a = Singleton.getInstance("a1");
let b = Singleton.getInstance("b1");
console.log("[ a===b ] >", a === b); // true
