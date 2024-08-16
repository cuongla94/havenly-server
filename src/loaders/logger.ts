import winston from 'winston';
import { config } from '../config';

const transports: winston.transport[] = [];

if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), 
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        winston.format.printf(({ timestamp, level, message }) => {
          const formattedMessage = message.replace(/\n/g, '\n    '); 
          return `[${timestamp}] ${formattedMessage}`;
        })
      ),
    }),
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() 
      ),
    }),
  );
}

const LoggerInstance: winston.Logger = winston.createLogger({
  level: config.logs.level, 
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
  ),
  transports,
});

export default LoggerInstance;
