const express = require("express");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");
const db = require("./models");
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    // Resolver
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose
  .connect("mongodb://localhost/go_meetings", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening on Port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
