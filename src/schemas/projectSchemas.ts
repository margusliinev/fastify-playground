const tag = ['Projects'] as const;

const newProject = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' },
        status: { enum: ['PLANNING', 'DEVELOPMENT', 'ON_HOLD', 'MAINTENANCE', 'COMPLETED'] },
        is_archived: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
    },
    required: ['title', 'description', 'start_date', 'end_date', 'status', 'is_archived'],
    additionalProperties: false
} as const;

const getProjectsResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object', properties: newProject.properties } }
    }
} as const;

const postProjectsResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'object', properties: newProject.properties }
    }
} as const;

const getProjectsSchema = {
    schema: {
        tags: tag,
        response: {
            200: getProjectsResponse
        }
    }
} as const;

const postProjectsSchema = {
    schema: {
        tags: tag,
        body: newProject,
        response: {
            201: postProjectsResponse
        }
    }
} as const;

const getSingleProjectSchema = {
    schema: {
        tags: tag
    }
};

export { getProjectsSchema, postProjectsSchema, getSingleProjectSchema };
