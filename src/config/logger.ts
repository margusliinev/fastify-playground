import { env } from 'node:process';

const NODE_ENV = (env.NODE_ENV as 'development' | 'production') || 'development';

const loggerConfig = {
    development: {
        logger: {
            transport: {
                target: '@fastify/one-line-logger',
                options: { colorize: true }
            }
        }
    },
    production: {
        logger: true
    }
};

export default loggerConfig[NODE_ENV].logger;
