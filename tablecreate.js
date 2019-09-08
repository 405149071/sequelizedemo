
console.log("创建表")
const Sequelize = require('sequelize');
module.exports = function(sequelize) {
  const User = sequelize.define('user', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
  }, {
      // 省略 createdAt 和 updateAt
      timestamps: false
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
