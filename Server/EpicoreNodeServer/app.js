const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const cors = require('cors');

import MongoConnection from './MongoService/mongoConnection';
import epicoreGraphQLSchema from './GraphQL/graphqlSchema';
import resolvers from './GraphQL/resolvers'; 

const { connect } = new MongoConnection();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization || ""; 
//     if (token === process.env.token) next();
//     res.send('401! not authenticated'); 
// }

// app.use(authMiddleware); 

app.use('/graphql', graphqlHttp({

    schema: epicoreGraphQLSchema,
    rootValue: {
        ...resolvers
    },
    graphiql: true
}))


connect(app);


