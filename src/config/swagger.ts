const swaggerConfig = {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Fastify Playground API',
            description: 'API Documentation for Fastify-Playground API',
            version: '1.0.0'
        },
        tags: [{ name: 'Users' }]
    }
};

export default swaggerConfig;
