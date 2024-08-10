import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const config = {
	port: parseInt((String(process.env.PORT)), 10),
	mongoURL: process.env.MAYAHFRAGRANCES_MONGO_URL as string,
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
	api: {
		prefix: '/api',
	}
};