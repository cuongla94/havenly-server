"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const graphql_1 = require("./graphql");
const services_1 = require("./services");
const logger_1 = __importDefault(require("./loaders/logger"));
const config_1 = require("./config");
dotenv_1.default.config();
const startServer = async () => {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    try {
        const db = await (0, services_1.connectToHavenlyDb)();
        const server = new server_1.ApolloServer({
            schema: graphql_1.GraphqlSchema,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        await server.start();
        const corsOptions = {
            origin: [
                'http://localhost:5000'
            ],
            methods: ['GET', 'POST', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        app.use('/graphql', (0, cors_1.default)(corsOptions), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: async ({ req }) => ({ token: req.headers.token, db }),
        }));
        await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || config_1.config.port }, resolve));
        logger_1.default.info(`
      ################################################
      🛡️  Server listening on port: ${config_1.config.port} 🛡️
      🌐 http://localhost:${config_1.config.port}/graphql
      ################################################
    `);
    }
    catch (error) {
        logger_1.default.error(error);
        await (0, services_1.closeConnection)();
    }
};
startServer();
