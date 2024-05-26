const tag = ['Deals'] as const;

const newDeal = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string', minLength: 3 },
        status: { type: 'string', enum: ['OPEN', 'WON', 'LOST', 'DELETED'] },
        user_id: { type: 'number' },
        project_id: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
    },
    required: ['title', 'status', 'user_id', 'project_id'],
    additionalProperties: false
} as const;

const getDealsResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object', properties: newDeal.properties } }
    }
} as const;

const postDealsResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'object', properties: newDeal.properties }
    }
} as const;

const getDealsSchema = {
    schema: {
        tags: tag,
        response: {
            200: getDealsResponse
        }
    }
} as const;

const postDealsSchema = {
    schema: {
        tags: tag,
        body: newDeal,
        response: {
            201: postDealsResponse
        }
    }
} as const;

export { getDealsSchema, postDealsSchema };
