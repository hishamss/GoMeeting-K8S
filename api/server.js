const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config()
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
//connect to mongodb container (for development only)
// mongoose
//   .connect("mongodb://mongoDB:27017/go_meetings", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//MongoDB clustor on Atlas
// mongoose
//   .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0sqbn.mongodb.net/go_meetings?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
// connect to mongodb container (for development only)
mongoose
  .connect("mongodb://mongo:27017/go_meetings", {
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
