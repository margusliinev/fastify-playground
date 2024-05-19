import { env } from 'node:process';
import config from './config/logger.js';
import Fastify from 'fastify';
import UsersRoute from './routes/users.js';

const app = Fastify({ logger: config.logger });

await app.register(UsersRoute, { prefix: '/api/users' });

const start = async () => {
    try {
        await app.listen({ port: Number(env.PORT) || 5000 });
        app.log.info(`Server running in ${env.NODE_ENV || 'development'} mode on port ${env.PORT || 5000}`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

const gracefulShutdown = async (): Promise<void> => {
    try {
        await app.close();
        app.log.info('Server shutdown gracefully');
        process.exit(0);
    } catch (err) {
        app.log.error('Error shutting down server:', err);
        process.exit(1);
    }
};

process.on('SIGTERM', () => void gracefulShutdown());
process.on('SIGINT', () => void gracefulShutdown());

await start();
