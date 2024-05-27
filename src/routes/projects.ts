import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getProjectsSchema, getSingleProjectSchema, postProjectsSchema } from '@/schemas/projectSchemas.js';
import { Project, ProjectWithUsersAndDeals } from '@/types/index.js';

function projectsRouter(app: FastifyInstance, _opts: FastifyPluginOptions, done: Function) {
    app.get('/api/projects', getProjectsSchema, async (_request, reply) => {
        const projects = await app.db.select<Project[]>('*').from('projects');
        await reply.send({ success: true, data: projects });
    });

    app.post('/api/projects', postProjectsSchema, async (request, reply) => {
        const { title, description, start_date, end_date, status, is_archived } = request.body as Partial<Project>;
        const [newProjectID] = await app.db('projects').insert({ title, description, start_date, end_date, status, is_archived });
        const newProject = await app.db<Project>('projects').where('id', newProjectID).first();
        await reply.code(201).send({ success: true, data: newProject });
    });

    app.get('/api/projects/:id', getSingleProjectSchema, async (request, reply) => {
        const { id } = request.params as { id: string };
        const project = await app.db
            .select(
                'users.id',
                'users.username',
                'users.email',
                'users.password',
                'users.created_at as user_created_at',
                'users.updated_at as user_updated_at',
                'projects.id as project_id',
                'projects.title as project_title',
                'projects.description as project_description',
                'projects.start_date as project_start_date',
                'projects.end_date as project_end_date',
                'projects.status as project_status',
                'projects.is_archived',
                'projects.created_at as project_created_at',
                'projects.updated_at as project_updated_at',
                'deals.id as deal_id',
                'deals.title as deal_title',
                'deals.status as deal_status',
                'deals.user_id',
                'deals.created_at as deal_created_at',
                'deals.updated_at as deal_created_at'
            )
            .from('users_projects')
            .where('users_projects.project_id', Number(id))
            .leftJoin('projects', 'projects.id', 'users_projects.project_id')
            .leftJoin('users', 'users.id', 'users_projects.user_id')
            .leftJoin('deals', 'deals.project_id', 'projects.id');

        const projectWithUsersAndDeals: ProjectWithUsersAndDeals = {
            id: project[0].project_id,
            title: project[0].project_title,
            description: project[0].project_description,
            start_date: project[0].project_start_date,
            end_date: project[0].project_end_date,
            status: project[0].project_status,
            is_archived: project[0].is_archived,
            created_at: project[0].project_created_at,
            updated_at: project[0].project_updated_at,
            users: project
                .map((result) => ({
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    password: result.password,
                    created_at: result.user_created_at,
                    updated_at: result.user_updated_at
                }))
                .filter((user, index, self) => index === self.findIndex((t) => t.id === user.id)),
            deals: project
                .map((result) => ({
                    id: result.deal_id,
                    title: result.deal_title,
                    status: result.deal_status,
                    user_id: result.user_id,
                    project_id: result.project_id,
                    created_at: result.deal_created_at,
                    updated_at: result.deal_updated_at
                }))
                .filter((deal, index, self) => index === self.findIndex((t) => t.id === deal.id))
        };
        await reply.code(200).send({ success: true, data: projectWithUsersAndDeals });
    });

    done();
}

export default projectsRouter;
