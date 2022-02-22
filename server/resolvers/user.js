const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const path = require('path');
const { GraphQLScalarType } = require('graphql');

const mainDir = path.dirname(require.main.filename);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

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
        me: (_p, _a, { me }) => {
            if (me) return me;
            throw new Error('Not logged in');
        },
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
        uploadImage: async (parent, { filename }, { models, me }) => {
            if (!me) {
                throw new Error('Not logged in');
            }
            filePath = `${mainDir}/uploads/${filename}.jpeg`;
            const photo = await cloudinary.v2.uploader.upload(filePath);
            await models.User.update(
                {
                    photo: `${photo.public_id}.${photo.format}`,
                },
                { where: { id: me.id } },
            );
            return true;
        },
    },
    User: {
        cars: (parent, _, { models }) => models.Car.findAll({ where: { userId: parent.id } }),
        photo: (parent, { options }) => cloudinary.url(parent.photo),
    },
    CloudinaryOptions: new GraphQLScalarType({
        name: 'CloudinaryOptions',
        description: 'the options to be passed to Cloudinary',
        parseValue(value) {
            return value;
        },
        serialize(value) {
            return value;
        },
        parseLiteral(ast) {},
    }),
};

module.exports = resolvers;
