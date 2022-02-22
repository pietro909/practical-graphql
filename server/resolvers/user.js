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
    },
    User: {
        cars: (parent, _, { models }) => models.Car.findAll({ where: { userId: parent.id } }),
    },
};

module.exports = resolvers;
