import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Project } from '@/types/index.js';

function projectsRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/api/projects', async (_request, reply) => {
        const projects = await app.db.select<Project[]>('*').from('projects');
        await reply.send({ success: true, data: projects });
    });

    app.post('/api/projects', async (request, reply) => {
        const { title, description, start_date, end_date, status } = request.body as Partial<Project>;
        const [newProjectID] = await app.db('projects').insert({ title, description, start_date, end_date, status });
        const newProject = await app.db<Project>('projects').where('id', newProjectID).first();
        await reply.code(201).send({ success: true, data: newProject });
    });

    done();
}

export default projectsRouter;
