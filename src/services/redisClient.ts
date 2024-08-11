import { createClient } from 'redis';
import { config } from '../config';

const url = `redis://${config.redis.password ? `:${config.redis.password}@` : ''}${config.redis.host}:${config.redis.port}`;

const redisClient = createClient({ url });

redisClient.on('connect', () => {
  console.log(`Connected to Redis at ${config.redis.host}:${config.redis.port}`);
});

redisClient.on('ready', () => {
  console.log('Redis client is ready to use');
});

redisClient.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

export { redisClient };
