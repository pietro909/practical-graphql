const resolvers = {
    Query: {
        cars: (_p, _a, { models }) => models.Car.findAll(),
        car: (_, { id }, { models }) => models.Car.findByPk(id),
    },
    Mutation: {
        makeCar: (parent, { model, make, color }, { models, me }) => {
            if (!me) {
                throw new Error('Not authenticated');
            }
            return models.Car.create({ model, make, color, userId: me.id });
        },
        removeCar: (parent, { id }, { models, me }) => {
            if (!me) {
                throw new Error('Not authenticated');
            }
            models.Car.destroy({ where: { id } });
        },
    },
    Car: {
        owner: (parent, _, { models }) => models.User.findOne({ where: { id: parent.userId } }),
    },
};

module.exports = resolvers;
