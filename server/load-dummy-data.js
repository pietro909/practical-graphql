const { sequelize } = require('./models/dabatase');
const models = require('./models');

const createData = async () => {
    await models.User.create(
        {
            name: 'Blu',
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

sequelize.sync().then(async () => {
    try {
        await createData();
        process.exit(1);
    } catch (e) {
        console.error(e);
    }
});
