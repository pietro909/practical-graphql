const { sequelize } = require('./dabatase');
const { DataTypes } = require('sequelize');

const UserModel = require('./user')(sequelize, DataTypes);
const CarModel = require('./car')(sequelize, DataTypes);

const models = {
    User: UserModel,
    Car: CarModel,
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = models;
