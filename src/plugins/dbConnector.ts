import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import db from '../db/index.js';

function dbConnector(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.decorate('db', db);
    done();
}

export default fp(dbConnector);
