module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: { type: DataTypes.STRING },
    });

    User.associate = (models) => {
        // 1 -> many
        User.hasMany(models.Car, { onDelete: 'CASCADE' });
    };

    return User;
};
