const resolvers = {
    Query: {
        cars: (_p, _a, { models }) => models.cars,
        car: (_, { id }, { models }) => models.cars.find(({ id }) => id === id),
    },
    Mutation: {
        makeCar: (parent, { model, make, color, ownedBy }, { models }) => {
            const nextId = parseInt(models.cars[models.cars.length - 1].id, 10) + 1;
            const newCar = { id: nextId, model, make, color, ownedBy };
            models.cars.push(newCar);
            return newCar;
        },
        removeCar: (parent, { id }, { models }) => {
            let found = false;
            models.cars = models.cars.filter((car) => {
                if (car.id === id) {
                    found = true;
                    return false;
                }
                return true;
            });
            return found;
        },
    },
    Car: {
        owner: (parent, _, { models }) => models.users.find(({ id }) => id === parent.ownedBy),
    },
};

module.exports = resolvers;
