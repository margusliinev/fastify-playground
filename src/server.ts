import Fastify from 'fastify';
import config from './config/logger.js';
import usersRouter from './routes/users.js';
import closeWithGrace from 'close-with-grace';
import dbConnector from './plugins/dbConnector.js';
import { env } from 'node:process';

const app = Fastify({ logger: config.logger });

app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ message: error.message, stack: error.stack });
    await reply.code(error.statusCode || 500).send({ success: false, message: error.message });
});

app.setNotFoundHandler(async (request, reply) => {
    request.log.error('Route Not Found');
    await reply.code(404).send({ success: false, message: 'Route Not Found' });
});

await app.register(dbConnector);
await app.register(usersRouter, { prefix: '/api/users' });

const start = async () => {
    try {
        const PORT = Number(env.PORT) || 5000;
        const HOST = env.HOST || 'localhost';
        const NODE_ENV = env.NODE_ENV || 'development';

        await app.listen({ port: PORT, host: HOST });
        app.log.info(`Server running in ${NODE_ENV} mode`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

closeWithGrace(async function ({ signal, err }) {
    if (err) {
        app.log.error({ err }, 'server closing with error');
    } else {
        app.log.info(`${signal} received, server closing`);
    }
    await app.close();
});

await start();
