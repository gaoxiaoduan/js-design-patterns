/**
 * 需求：
 * 有个内衣工厂，有50种男士内衣，50种女士内衣，现在需要为推销商品，做展示，所以需要一些塑料模特来穿上内衣拍广告
 * 正常情况下要生产50个男模特，50个女模特，用代码表示为
 */
{
  let Model = function (sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
  };

  Model.prototype.taskPhoto = function () {
    console.log(`sex=${this.sex},underwear=${this.underwear}`);
  };

  // 这样会创建50个对象，造成内存上的一定浪费
  for (let i = 1; i <= 50; i++) {
    let manModel = new Model("man", "underwear" + i);
    manModel.taskPhoto();
  }
  for (let i = 1; i <= 50; i++) {
    let femaleModel = new Model("female", "underwear" + i);
    femaleModel.taskPhoto();
  }
}

/**
 * 使用享元模式
 * 拆分内部状态和外部状态
 * 内部状态是underwear，外部状态是sex
 */
{
  let Model = function (sex) {
    this.sex = sex;
  };

  Model.prototype.taskPhoto = function (underwear) {
    console.log(`sex=${this.sex},underwear=${underwear}`);
  };
  // 创建了两个对象，同样满足了需求
  // 拿时间换空间
  let manModel = new Model("man");
  let femaleModel = new Model("female");
  for (let i = 1; i <= 50; i++) {
    manModel.taskPhoto("underwear" + i);
    femaleModel.taskPhoto("underwear" + i);
  }
}
