import { MongoClient } from 'mongodb';
import { config } from '../config';
import Logger from '../loaders/logger';

let db: any;

export const connectToHavenlyDb = async () => {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(config.mongoURL);

    await client.connect();
    db = client.db(); // Use the default database specified in the connection string
    Logger.info('Connected to the database');
    return db;
  } catch (error: any) {
    Logger.error(`Database connection error: ${error.message}`);
    throw new Error('Database connection error');
  }
};

export const closeConnection = async () => {
  if (db) {
    await db.client.close();
    Logger.info('Disconnected from the database');
  }
};
