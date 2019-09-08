const Sequelize = require('sequelize');

function createTable2(sequelize){
  const Model = Sequelize.Model;
  // 这里 `timestamps` 为 false,因此不会创建 `createdAt` 和 `updatedAt` 字段.
  class Foo extends Model { }
  
  Foo.init({
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
  }, {
      // 不要忘记启用时间戳！
      timestamps: true,
  
      // 我不想要 createdAt
      createdAt: false,
  
      // 我想 updateAt 实际上被称为 updateTimestamp
      updatedAt: 'updateTimestamp',
  
      // 并且希望 deletedA t被称为 destroyTime(请记住启用paranoid以使其工作)
      deletedAt: 'destroyTime',
      paranoid: true,
      tableName: "foo",
  
      sequelize,
    });
}

module.exports = createTable2;