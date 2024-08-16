import { MongoClient, Db } from 'mongodb';
import { config } from '../config';
import Logger from '../loaders/logger';
import dotenv from 'dotenv';

dotenv.config();

let client: MongoClient;
let db: Db;

export const connectToMayahShopDB = async (): Promise<Db> => {
  if (db) {
    Logger.silly('Returning existing database connection');
    return db;
  }

  const { password, ip, user, port, dbName } = config.mongo;
  const mongoUrl = `mongodb://${user}:${password}@${ip}:${port}/${dbName}`;

  try {
    Logger.silly(`Attempting to connect to MongoDB at ${mongoUrl}`);
    client = new MongoClient(mongoUrl);

    await client.connect();
    db = client.db(dbName); // Explicitly select the database
    Logger.silly('Connected to the database');
    return db;
  } catch (error: any) {
    Logger.error(`Database connection error: ${error.message}`);
    throw new Error('Database connection error');
  }
};

export const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    Logger.info('Disconnected from the database');
  }
};
