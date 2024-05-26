import 'fastify';
import db from '@/db/index.ts';

declare module 'fastify' {
    interface FastifyInstance {
        db: typeof db;
    }
}

export enum DealStatus {
    OPEN = 'OPEN',
    WON = 'WON',
    LOST = 'LOST',
    DELETED = 'DELETED'
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface Deal {
    id: number;
    title: string;
    status: DealStatus;
    user_id: number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserWithDeals extends User {
    deals: Deal[];
}
