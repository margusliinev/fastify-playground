const env = process.env.NODE_ENV || 'development';

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

export default config[env as 'development' | 'production'];
