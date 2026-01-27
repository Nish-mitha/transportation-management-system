require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { verifyToken } = require('./utils/auth');

const context = ({ req }) => {
    const token = req.headers.authorization || '';
    const actualToken = token.replace('Bearer ', '');

    if (actualToken) {
        const user = verifyToken(actualToken);
        return { user };
    }
    return { user: null };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: true,
    cache: 'bounded',
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
