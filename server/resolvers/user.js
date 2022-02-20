const resolvers = {
    Query: {
        // me: (_p, _a, { models }) => models.me,
        users: (_p, _a, { models }) => models.User.findAll(),
        user: (_, { id }, { models }) => models.User.findByPk(id),
    },
    Mutation: {
        makeUser: (parent, { name }, { models }) => models.User.create({ name }),
        removeUser: (parent, { id }, { models }) => models.User.destroy({ where: { id } }),
    },
    User: {
        cars: (parent, _, { models }) => models.Car.findAll({ where: { userId: parent.id } }),
    },
};

module.exports = resolvers;
