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
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('连接成功被建立');
  })
  .catch(err => {
    console.error('连接建立失败:', err);
  });


