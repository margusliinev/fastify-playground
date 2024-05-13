import Fastify from 'fastify';

const app = Fastify();

app.get('/', function handler() {
    return { hello: 'world' };
});

await app.listen({ port: 5000 });
