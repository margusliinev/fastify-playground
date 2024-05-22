const swaggerConfig = {
    swagger: {
        info: {
            title: 'Fastify Playground API',
            description: 'API Documentation for Fastify-Playground API',
            version: '0.1.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{ name: 'Users', description: 'Users are people with access to your account.' }]
    }
};

export default swaggerConfig;
