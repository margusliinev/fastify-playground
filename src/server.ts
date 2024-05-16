import build from './app.js';

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    },
    production: true,
    test: false
};

const app = build({
    logger: envToLogger[process.env.NODE_ENV as keyof typeof envToLogger],
    ignoreTrailingSlash: true
});

await app.listen({ port: 5000 });
