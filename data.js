let users = [
    {
        id: '1',
        name: 'Blu',
        cars: ['1', '2'],
    },
    { id: '2', name: 'Zeno', cars: ['3'] },
    { id: '3', name: 'Romeo', cars: [] },
];

let cars = [
    {
        id: '1',
        make: 'Fiat',
        model: 'Panda',
        color: 'blue',
        ownedBy: '1',
    },
    { id: '2', make: 'Renault', model: 'Clio', color: 'dark green', ownedBy: '1' },
    { id: '3', make: 'Fiat', model: 'Tipo', color: 'red', ownedBy: '2' },
];

module.exports = { users, cars };
