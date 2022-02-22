const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING, unique: true, validate: { notEmpty: true } },
        password: { type: DataTypes.STRING, validate: { notEmpty: true }, len: [4, 16] },
        photo: { type: DataTypes.STRING },
    });

    User.associate = (models) => {
        // 1 -> many
        User.hasMany(models.Car, { onDelete: 'CASCADE' });
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });
    return User;
};
