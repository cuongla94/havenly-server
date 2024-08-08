import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { GraphqlSchema } from './graphql'; // Adjust the import based on your file structure
import { connectToHavenlyDb, closeConnection } from './services';
import Logger from './loaders/logger';
import { config } from './config';

dotenv.config();

interface MyContext {
  token?: string;
}

const startServer = async () => {
  const app: Application = express();
  const httpServer = http.createServer(app);

  try {
    const db = await connectToHavenlyDb();

    const server = new ApolloServer<MyContext>({
      schema: GraphqlSchema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token, db }),
      }),
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT || config.port }, resolve)
    );
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${process.env.PORT || config.port} 🛡️
      🌐 http://localhost:${process.env.PORT || config.port}/graphql
      ################################################
    `);
  } catch (error) {
    Logger.error(error);
    await closeConnection();
  }
};

startServer();
