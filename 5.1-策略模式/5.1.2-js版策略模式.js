let strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};

let calculateBonus = function (level, salary) {
  return strategies[level](salary);
};

console.log(calculateBonus("B", 20000)); // 40000
console.log(calculateBonus("S", 6000)); // 24000
