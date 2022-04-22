/**
 * 模板方法模式是一种只需使用继承就可以实现的非常简单的模式。
 * 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
 * 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
 * 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
 *
 * 假如我们有一些平行的子类，各个子类之间有一些相同的行为，也有一些不同的行为。
 * 如果相同和不同的行为都混合在各个子类的实现中，说明这些相同的行为会在各个子类中重复出现。
 * 但实际上，相同的行为可以被搬移到另外一个单一的地方，模板方法模式就是为解决这个问题而生的。
 * 在模板方法模式中，子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现。
 * 这也很好地体现了泛化的思想
 */

/**
 * 冲咖啡步骤
 * 1.把水煮沸
 * 2.用沸水冲泡咖啡
 * 3.把咖啡倒进杯子
 * 4.加糖和牛奶
 */

// class Coffee {
//   boilWater() {
//     console.log("把水煮沸");
//   }
//   brewCoffeeGriend() {
//     console.log("用沸水冲泡咖啡");
//   }
//   pourInCup() {
//     console.log("把咖啡倒进杯子");
//   }
//   addCondiments() {
//     console.log("加糖和牛奶");
//   }
//   init() {
//     this.boilWater();
//     this.brewCoffeeGriend();
//     this.pourInCup();
//     this.addCondiments();
//   }
// }
// let coffee = new Coffee();
// coffee.init();

/**
 * 泡茶步骤
 * 1.把水煮沸
 * 2.用沸水冲泡茶叶
 * 3.把茶叶倒进杯子
 * 4.加柠檬
 */
// class Tea {
//   boilWater() {
//     console.log("把水煮沸");
//   }
//   steepTeaBag() {
//     console.log("用沸水冲泡茶叶");
//   }
//   pourInCup() {
//     console.log("把茶叶倒进杯子");
//   }
//   addLemon() {
//     console.log("加柠檬");
//   }
//   init() {
//     this.boilWater();
//     this.steepTeaBag();
//     this.pourInCup();
//     this.addLemon();
//   }
// }
// let tea = new Tea();
// tea.init();

/**
 * 模版模式
 */
class Beverage {
  boilWater() {
    console.log("把水煮沸");
  }
  brew() {} // 子类必须实现
  pourInCup() {} // 子类必须实现
  addCondiments() {} // 子类必须实现
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}

class Coffee extends Beverage {
  brew() {
    console.log("用沸水冲泡咖啡");
  }
  pourInCup() {
    console.log("把咖啡倒进杯子");
  }
  addCondiments() {
    console.log("加糖和牛奶");
  }
}
let coffee = new Coffee();
coffee.init();

class Tea extends Beverage {
  brew() {
    console.log("用沸水冲泡茶叶");
  }
  pourInCup() {
    console.log("把茶叶倒进杯子");
  }
  addCondiments() {
    console.log("加柠檬");
  }
}
let tea = new Tea();
tea.init();