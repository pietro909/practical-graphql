const resolvers = {
    Query: {
        cars: (_p, _a, { models }) => models.Car.findAll(),
        car: (_, { id }, { models }) => models.Car.findByPk(id),
    },
    Mutation: {
        makeCar: (parent, { model, make, color, ownedBy }, { models }) =>
            models.Car.create({ model, make, color, userId: ownedBy }),
        removeCar: (parent, { id }, { models }) => models.Car.destroy({ where: { id } }),
    },
    Car: {
        owner: (parent, _, { models }) => models.User.findOne({ where: { id: parent.userId } }),
    },
};

module.exports = resolvers;
