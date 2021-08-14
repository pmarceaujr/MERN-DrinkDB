const express = require('express');
const path = require('path');
const db = require('./config/connection');
const bodyParser = require('body-parser')
const cors = require('cors')
const Drink = require('./models/Drink')
const User = require("./models/User")
const { ApolloServer, graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


const app = express();

const corsOptions = {
  origin: 'https://localhost:3005',
  credentials: true
}
app.use(cors('*'))
const PORT = process.env.PORT || 3005;




async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })
  await server.start()
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  // server.applyMiddleware({ app });
}
startApolloServer(typeDefs, resolvers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.get('*', (req, res) => {
///  res.sendFile(path.join(__dirname, '../client/build/index.html'));
//})

//app.use("/graphiql", graphiqlExpress({ endpointURL: "graphql" }));

/*app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    typeDefs,
    resolvers,
    context: {
      Drink,
      User,
      currentUser
    }
  }))
)
*/