const { hashSync } = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING, unique: true, validate: { notEmpty: true } },
        password: { type: DataTypes.STRING, validate: { notEmpty: true }, len: [4, 16] },
    });

    User.associate = (models) => {
        // 1 -> many
        User.hasMany(models.Car, { onDelete: 'CASCADE' });
    };

    User.beforeCreate((user) => {
        user.password = hashSync(user.password, 10);
    });
    return User;
};
