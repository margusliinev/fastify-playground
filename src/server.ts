import Fastify from 'fastify';

const app = Fastify();

app.get('/', async function handler() {
    return { hello: 'world' };
});

app.listen({ port: 5000 });
