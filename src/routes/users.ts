import { FastifyInstance, RegisterOptions, HookHandlerDoneFunction } from 'fastify';
import { User } from '@/utils/types.js';
import db from '../db/index.js';

function UsersRoute(app: FastifyInstance, _opts: RegisterOptions, done: HookHandlerDoneFunction) {
    app.get('/', async (_request, reply) => {
        const users = await db.select<User[]>('*').from('users');
        await reply.send(users);
    });
    done();
}

export default UsersRoute;
