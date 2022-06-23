const { makeExecutableSchema } = require('graphql-tools') 
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express'); 
const http = require('http'); 
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs, resolvers
})

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers); 