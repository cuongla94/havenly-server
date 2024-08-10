"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.connectToHavenlyDb = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const logger_1 = __importDefault(require("../loaders/logger"));
let client;
let db;
const connectToHavenlyDb = async () => {
    if (db) {
        return db;
    }
    try {
        client = new mongodb_1.MongoClient(config_1.config.mongoURL);
        await client.connect();
        db = client.db(); // Use the default database specified in the connection string
        logger_1.default.info('Connected to the database');
        return db;
    }
    catch (error) {
        logger_1.default.error(`Database connection error: ${error.message}`);
        throw new Error('Database connection error');
    }
};
exports.connectToHavenlyDb = connectToHavenlyDb;
const closeConnection = async () => {
    if (client) {
        await client.close();
        logger_1.default.info('Disconnected from the database');
    }
};
exports.closeConnection = closeConnection;
