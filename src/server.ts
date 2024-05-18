import Fastify from 'fastify';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
dotenv.config();

const envToLogger = {
    development: false,
    production: true
};

const app = Fastify({ logger: envToLogger[process.env.NODE_ENV as keyof typeof envToLogger] });

await app.register(taskRoutes, { prefix: '/api/tasks' });

const start = async () => {
    try {
        await app.listen({ port: Number(process.env.PORT) || 5000 });
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

await start();
