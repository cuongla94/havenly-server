"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.config = {
    port: parseInt(process.env.PORT, 10),
    mongoURL: process.env.MAYAHFRAGRANCES_MONGO_URL,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    }
};
