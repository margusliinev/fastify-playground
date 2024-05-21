import 'fastify';
import db from '@/db/index.ts';

declare module 'fastify' {
    interface FastifyInstance {
        db: typeof db;
    }
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}
