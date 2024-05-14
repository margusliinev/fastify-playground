import { build } from './app.js';

const opts = {
    logger: {
        level: 'info'
    }
};

const app = await build(opts);

await app.listen({ port: 5000 });
