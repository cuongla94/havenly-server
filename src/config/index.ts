import dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: parseInt(String(process.env.PORT), 10),
	mongoURL: String(process.env.MAYAH_SHOP_MONGO_URL),
	logs: {
		level: String(process.env.LOG_LEVEL) || 'silly',
	},
	api: {
		prefix: '/api',
	},
	redis: {
		host: String(process.env.REDIS_IP),
		password: String(process.env.REDIS_PASSWORD),
		port: String(process.env.REDIS_PORT)
	}
};