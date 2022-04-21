// var calculateBonus = function (performanceLevel, salary) {
//   if (performanceLevel === "S") {
//     return salary * 4;
//   }
//   if (performanceLevel === "A") {
//     return salary * 3;
//   }
//   if (performanceLevel === "B") {
//     return salary * 2;
//   }
// };

// calculateBonus("B", 20000); //40000
// calculateBonus("S", 6000); // 24000

/**
 * 策略模式：封装各自的策略类，使得策略类可以独立于使用它的客户端而变化
 */
let performanceLevelS = function () {};
performanceLevelS.prototype.calculate = function (salary) {
  return salary * 4;
};

let performanceLevelA = function () {};
performanceLevelA.prototype.calculate = function (salary) {
  return salary * 3;
};

let performanceLevelB = function () {};
performanceLevelB.prototype.calculate = function (salary) {
  return salary * 2;
};

let Bouns = function () {
  this.salary = null; //原始工资
  this.strategy = null; // 策略对象
};
Bouns.prototype.setSalary = function (salary) {
  this.salary = salary;
};
Bouns.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
};
Bouns.prototype.getBouns = function () {
  return this.strategy.calculate(this.salary); // 把奖金计算赋给策略对象
};


let bouns = new Bouns();
bouns.setSalary(20000);
bouns.setStrategy(new performanceLevelB());
console.log(bouns.getBouns()); // 40000

bouns.setSalary(6000);
bouns.setStrategy(new performanceLevelS());
console.log(bouns.getBouns()); // 24000