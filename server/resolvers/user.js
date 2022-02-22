const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { id, name, username } = user;
    return jwt.sign(
        {
            id,
            name,
            username,
        },
        secret,
        { expiresIn },
    );
};

const resolvers = {
    Query: {
        // me: (_p, _a, { models }) => models.me,
        users: (_p, _a, { models }) => models.User.findAll(),
        user: (_, { id }, { models }) => models.User.findByPk(id),
    },
    Mutation: {
        registerUser: (parent, { name, username, password }, { models }) =>
            models.User.create({ name, username, password }),
        removeUser: (parent, { id }, { models }) => models.User.destroy({ where: { id } }),
        login: async (parent, { username, password }, { models, secret }) => {
            const user = await models.User.findOne({ where: { username } });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.validatePassword(password)) {
                return {
                    token: createToken(user, secret, '4m'),
                };
            }
            throw new Error('Password is incorrect');
        },
    },
    User: {
        cars: (parent, _, { models }) => models.Car.findAll({ where: { userId: parent.id } }),
    },
};

module.exports = resolvers;
