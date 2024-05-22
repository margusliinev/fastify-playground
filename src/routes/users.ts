import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getUsersSchema, postUsersSchema } from '@/schemas/userSchemas.js';
import { User } from '@/types/index.js';

function usersRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/users', getUsersSchema, async (_request, reply) => {
        const users = await app.db.select<User[]>('*').from('users');
        await reply.send({ success: true, data: users });
    });

    app.post('/users', postUsersSchema, async (request, reply) => {
        const { username, email, password } = request.body as Partial<User>;
        const [newUserID] = await app.db('users').insert({ username, email, password });
        const newUser = await app.db<User>('users').where('id', newUserID).first();
        await reply.code(201).send({ success: true, data: newUser });
    });

    done();
}

export default usersRouter;
