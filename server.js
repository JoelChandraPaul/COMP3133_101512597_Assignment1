require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express4");

// ✅ Upload middleware (required for Upload scalar)
const { graphqlUploadExpress } = require("graphql-upload");

const connectDB = require("./src/config/db");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

async function start() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());

  // IMPORTANT: upload middleware must come BEFORE express.json()
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));
  app.use(express.json());

  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  app.get("/", (req, res) => res.json({ status: "ok" }));

  const port = process.env.PORT || 4000;
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
