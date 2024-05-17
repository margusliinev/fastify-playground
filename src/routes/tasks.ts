import { FastifyInstance, RegisterOptions, HookHandlerDoneFunction } from 'fastify';

export default function taskRoutes(app: FastifyInstance, _opts: RegisterOptions, done: HookHandlerDoneFunction) {
    app.get('/', async (_request, reply) => {
        await reply.send('Get all tasks');
    });
    app.post('/', async (request, reply) => {
        if (!request.body) await reply.code(400).send('Bad Request');

        await reply.send('Create a task');
    });
    done();
}
