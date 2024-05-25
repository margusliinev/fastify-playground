import { Deal } from '@/types/index.js';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

function dealsRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/api/deals', async (_request, reply) => {
        const deals = await app.db.select<Deal[]>('*').from('deals');
        await reply.send({ success: true, data: deals });
    });

    app.post('/api/deals', async (request, reply) => {
        const { title, status, user_id, project_id } = request.body as Partial<Deal>;
        const [newDealID] = await app.db('deals').insert({ title, status, user_id, project_id });
        const newDeal = await app.db<Deal>('deals').where('id', newDealID).first();
        await reply.code(201).send({ success: true, data: newDeal });
    });

    done();
}

export default dealsRouter;
