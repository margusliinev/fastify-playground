const tag = ['Users'] as const;

const newUser = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false
} as const;

const getUsersResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object', properties: newUser.properties } }
    }
} as const;

const postUsersResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        data: { type: 'object', properties: newUser.properties }
    }
} as const;

const getUsersSchema = {
    schema: {
        tags: tag,
        response: {
            200: getUsersResponse
        }
    }
} as const;

const postUsersSchema = {
    schema: {
        tags: tag,
        body: newUser,
        response: {
            201: postUsersResponse
        }
    }
} as const;

const getSingleUserWithDealsSchema = {
    schema: {
        tags: tag
    }
};

export { getUsersSchema, postUsersSchema, getSingleUserWithDealsSchema };
