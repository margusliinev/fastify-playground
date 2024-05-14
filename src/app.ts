import fastify from 'fastify';

export async function build(opts = {}) {
    const app = fastify(opts);

    app.get('/', function handler() {
        return { hello: 'world' };
    });

    return app;
}
