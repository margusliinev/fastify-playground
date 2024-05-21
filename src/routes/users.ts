import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User } from '@/types/index.js';

function usersRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/', async (_request, reply) => {
        const users = await app.db.select<User[]>('*').from('users');
        await reply.send({ success: true, data: users });
    });
    done();
}

export default usersRouter;
