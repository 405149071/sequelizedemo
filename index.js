

console.log("建立连接");

const Sequelize = require('sequelize');

//方法1:单独传递参数
const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',/* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
    // 该值默认为 true, 但是当前设定为 false
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('连接成功被建立');
    global.sequelize = sequelize
    // 连接关闭
    // sequelize.close();
    // console.log("已经关闭")
  })
  .catch(err => {
    console.error('连接建立失败:', err);
  });


// 创建表
// var userCreate = require("./tablecreate.js")
// userCreate(sequelize)
// 或者
require("./tablecreate.js")(sequelize)

const Model = Sequelize.Model;
// 创建foo表
require("./tablecreate2.js")(sequelize)
// 这里 `timestamps` 直接设置为 true,因此将创建 `createdAt` 和 `updatedAt` 字段.
class Bar extends Model { }
Bar.init({ /* ... */ }, { sequelize, timestamps: true });