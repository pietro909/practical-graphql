const resolvers = {
    Query: {
        me: (_p, _a, { models }) => models.me,
        users: (_p, _a, { models }) => models.users,
        user: (_, { id }, { models }) => models.users.find((user) => user.id === id),
    },
    Mutation: {
        makeUser: (parent, { name }, { models }) => {
            const nextId = parseInt(models.users[models.users.length - 1].id, 10) + 1;
            const newUser = { id: nextId, name, cars: [] };
            models.users.push(newUser);
            return newUser;
        },
        removeUser: (parent, { id }, { models }) => {
            let found = false;
            models.users = models.users.filter((user) => {
                if (user.id === id) {
                    found = true;
                    return false;
                }
                return true;
            });
            return found;
        },
    },
    User: {
        cars: (parent, _, { models }) =>
            parent.cars.map((carId) => models.cars.find(({ id }) => id === carId)),
    },
};

module.exports = resolvers;
