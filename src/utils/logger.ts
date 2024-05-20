import { env } from 'node:process';

const config = {
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

export default config[env.NODE_ENV as 'development' | 'production'];
