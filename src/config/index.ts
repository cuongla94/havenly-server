import dotenv from 'dotenv';

const prodEnv = process.env.NODE_ENV as string;
console.log(`NODE_ENV: ${JSON.stringify(prodEnv)}`);

const envFile = prodEnv === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });
process.env.NODE_ENV = prodEnv || 'development';

export const config = {
	port: parseInt((process.env.PORT as string), 10),
	mongoURL: process.env.MAYAH_SHOP_MONGO_URL as string,
	logs: {
		level: process.env.LOG_LEVEL as string || 'silly',
	},
	api: {
		prefix: '/api',
	},
	redis: {
		host: process.env.REDIS_IP as string,
		password: process.env.REDIS_PASSWORD as string,
		port: process.env.REDIS_PORT as string
	}
};