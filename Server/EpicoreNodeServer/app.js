const express = require('express');
const bodyParser = require('body-parser');

// const graphqlHttp = require('express-graphql');
const { ApolloServer } = require('apollo-server');
const cors = require('cors');

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import MongoConnection from './MongoService/mongoConnection';
import schema from './GraphQL/schema';

const { connect } = new MongoConnection();
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization || ""; 
//     if (token === process.env.token) next();
//     res.send('401! not authenticated'); 
// }

// app.use(authMiddleware); 

const apolloServer = new ApolloServer({
    schema, 
    plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
    }],
});

const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
    }, {
    server: httpServer,
    path: apolloServer.graphqlPath,
});

const startApolloServer = async () =>{
    await apolloServer.start();
}

startApolloServer();
apolloServer.applyMiddleware({ app });

const PORT = 5000;

httpServer.listen(PORT, () =>{
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    connect(app);
});




