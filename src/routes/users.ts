import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User } from '@/types/index.js';

// TEMPORARY SOLUTION

const newUserSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false
};

const getUsersResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object', properties: newUserSchema.properties } }
    }
} as const;

const postUsersResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'object', properties: newUserSchema.properties }
    }
} as const;

const tags = ['Users'] as const;

const getUsersConfig = {
    schema: {
        tags,
        response: {
            200: getUsersResponse
        }
    }
} as const;

const postUsersConfig = {
    schema: {
        body: newUserSchema,
        tags,
        response: {
            201: postUsersResponse
        }
    }
} as const;

function usersRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/users', getUsersConfig, async (_request, reply) => {
        const users = await app.db.select<User[]>('*').from('users');
        await reply.send({ success: true, data: users });
    });

    app.post('/users', postUsersConfig, async (request, reply) => {
        const { username, email, password } = request.body as Partial<User>;
        const [newUserID] = await app.db('users').insert({ username, email, password });
        const newUser = await app.db<User>('users').where('id', newUserID).first();
        await reply.code(201).send({ success: true, data: newUser });
    });

    done();
}

export default usersRouter;
