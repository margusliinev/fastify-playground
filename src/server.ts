import Fastify from 'fastify';
import loggerConfig from './config/logger.js';
import swaggerConfig from './config/swagger.js';
import closeWithGrace from 'close-with-grace';
import dbConnector from './plugins/dbConnector.js';
import autoLoad from '@fastify/autoload';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({ logger: loggerConfig });

app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ message: error.message, stack: error.stack });
    await reply.code(error.statusCode || 500).send({ success: false, message: error.message });
});

app.setNotFoundHandler(async (request, reply) => {
    request.log.error('Route Not Found');
    await reply.code(404).send({ success: false, message: 'Route Not Found' });
});

await app.register(swagger, swaggerConfig);
await app.register(swaggerUI, { routePrefix: '/docs' });
await app.register(dbConnector);
await app.register(autoLoad, { options: { prefix: '/api' }, dir: join(__dirname, 'routes') });

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
