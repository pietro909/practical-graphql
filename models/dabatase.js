const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('practical_graphql', 'root', 'my-secret-pw', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    define: { timestamps: false },
});

module.exports = { sequelize };
