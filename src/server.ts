import Fastify from 'fastify';
import config from './utils/logger.js';
import UsersRoute from './routes/users.js';
import { env } from 'node:process';

const app = Fastify({ logger: config.logger });

app.setErrorHandler(async (error, request, reply) => {
    request.log.error(error.message);
    await reply.code(error.statusCode || 500).send({ success: false, message: error.message });
});

app.setNotFoundHandler(async (request, reply) => {
    request.log.error('Not Found');
    await reply.code(404).send({ success: false, message: 'Not Found' });
});

await app.register(UsersRoute, { prefix: '/api/users' });

const start = async () => {
    try {
        await app.listen({ port: Number(env.PORT) || 5000 });
        app.log.info(`Server running in ${env.NODE_ENV} mode`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

const gracefulShutdown = async (signal: string): Promise<void> => {
    try {
        await app.close();
        console.log('\n');
        app.log.info(`${signal} received, server closing`);
        process.exit(0);
    } catch (err) {
        console.log('\n');
        app.log.error('Error shutting down server:', err);
        process.exit(1);
    }
};

process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => void gracefulShutdown('SIGINT'));

await start();
