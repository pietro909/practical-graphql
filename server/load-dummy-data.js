const { sequelize } = require('./models/dabatase');
const models = require('./models');

const createData = async () => {
    await models.User.create(
        {
            name: 'Blu',
            username: 'blu',
            password: 'blu1',
            cars: [
                {
                    make: 'Fiat',
                    model: 'Uno',
                    color: 'darkgreen',
                },
            ],
        },
        { include: [models.Car] },
    );
    await models.User.create(
        {
            name: 'Zeno',
            username: 'zeno',
            password: 'zeno1',
            cars: [
                {
                    make: 'Fiat',
                    model: 'Panda',
                    color: 'orange',
                },
            ],
        },
        { include: [models.Car] },
    );
};

sequelize.sync({ force: true }).then(async () => {
    try {
        await createData();
        process.exit(1);
    } catch (e) {
        console.error(e);
    }
});
