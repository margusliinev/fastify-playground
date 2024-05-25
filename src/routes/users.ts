import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getUsersSchema, postUsersSchema } from '@/schemas/userSchemas.js';
import { User, UserWithDeals } from '@/types/index.js';

function usersRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/api/users', getUsersSchema, async (_request, reply) => {
        const users = await app.db.select<User[]>('*').from('users');
        await reply.send({ success: true, data: users });
    });

    app.post('/api/users', postUsersSchema, async (request, reply) => {
        const { username, email, password } = request.body as Partial<User>;
        const [newUserID] = await app.db('users').insert({ username, email, password });
        const newUser = await app.db<User>('users').where('id', newUserID).first();
        await reply.code(201).send({ success: true, data: newUser });
    });

    app.get('/api/users/:id/deals', async (request, reply) => {
        const { id } = request.params as { id: string };
        const results = await app.db
            .select(
                'users.id',
                'users.username',
                'users.email',
                'users.password',
                'users.created_at as user_created_at',
                'users.updated_at as user_updated_at',
                'deals.id as deal_id',
                'deals.title',
                'deals.status',
                'deals.user_id',
                'deals.project_id',
                'deals.created_at as deal_created_at',
                'deals.updated_at as deal_updated_at'
            )
            .from('users')
            .where('users.id', Number(id))
            .leftJoin('deals', 'users.id', 'deals.user_id');

        if (results.length === 0) {
            return reply.code(404).send({ success: false, message: 'User not found' });
        }

        const userWithDeals: UserWithDeals = {
            id: results[0].id,
            username: results[0].username,
            email: results[0].email,
            password: results[0].password,
            created_at: results[0].user_created_at,
            updated_at: results[0].user_updated_at,
            deals: results
                .filter((result) => result.deal_id)
                .map((result) => ({
                    id: result.deal_id,
                    title: result.title,
                    status: result.status,
                    user_id: result.user_id,
                    project_id: result.project_id,
                    created_at: result.deal_created_at,
                    updated_at: result.deal_updated_at
                }))
        };
        await reply.send({ success: true, data: userWithDeals });
    });

    done();
}

export default usersRouter;
