
console.log("创建表")
const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const User = sequelize.define('user', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
  }, {
      // 模型的名称. 该模型将以此名称存储在`sequelize.models`中.
      // 在这种情况下,默认为类名,即Bar. 
      // 这将控制自动生成的foreignKey和关联命名的名称
      modelName: 'user',
      // 不添加时间戳属性 (updatedAt, createdAt)
      timestamps: false,
      // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时). 
      // paranoid 只有在启用时间戳时才能工作
      paranoid: true,
      // 将自动设置所有属性的字段参数为下划线命名方式.
      // 不会覆盖已经定义的字段选项
      underscored: true,
      // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置以下内容
      freezeTableName: true,

      // 启用乐观锁定. 启用时,sequelize将向模型添加版本计数属性,
      // 并在保存过时的实例时引发OptimisticLockingError错误.
      // 设置为true或具有要用于启用的属性名称的字符串.
      version: true,

    });

  // 第一次没有表的时候需要同步来创建
  // http://docs.sequelizejs.com/manual/tutorial/instances.html
  // 官方还有两种额外的做法，一种是先build一个实例，然后save()，一种是直接create
  sequelize.sync({
    force: true
  }).then(() => {
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    })
  }).then(() => {
    return User.findAll({
      where: {
        firstName: 'John'
      }
    })
  }).then(console.log)
}
