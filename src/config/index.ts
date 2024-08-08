import dotenv from 'dotenv';
dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const config = {
	port: parseInt((String(process.env.PORT)), 10),
	mongoURL: String(process.env.HAVENLY_MONGODB_URL),
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
	api: {
		prefix: '/api',
	}
};