const express = require('express'); 
const schema = require('./schema'); 
const { ApolloServer } = require('apollo-server-express'); 


async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers});

    await server.start();
  
    const app = express();
  
    server.applyMiddleware({
       app,
       path: '/'
    });
  
    // Modified server startup
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

startApolloServer(schema.typeDefs, schema.resolvers)