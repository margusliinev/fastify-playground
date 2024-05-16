import fastify from 'fastify';

function build(opts = {}) {
    const app = fastify(opts);

    app.get('/', function handler() {
        return 'OK';
    });

    return app;
}

export default build;
