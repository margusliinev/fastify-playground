import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();

    await knex('users').insert([
        {
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'johndoe123'
        },
        {
            username: 'mariaglenn',
            email: 'mariaglenn@gmail.com',
            password: 'mariaglenn123'
        },
        {
            username: 'shawntray',
            email: 'shawntray@gmail.com',
            password: 'shawntray123'
        },
        {
            username: 'mikebrown',
            email: 'mikebrown@gmail.com',
            password: 'mikebrown123'
        },
        {
            username: 'larrysmith',
            email: 'larrysmith@gmail.com',
            password: 'larrysmith123'
        },
        {
            username: 'joeduffy',
            email: 'joeduffy@gmail.com',
            password: 'joeduffy123'
        },
        {
            username: 'chrismiller',
            email: 'chrismiller@gmail.com',
            password: 'chrismiller123'
        },
        {
            username: 'changlee',
            email: 'changlee@gmail.com',
            password: 'changlee123'
        },
        {
            username: 'andreamoore',
            email: 'andreamoore@gmail.com',
            password: 'andreamoore123'
        },
        {
            username: 'davidcooper',
            email: 'davidcooper@gmail.com',
            password: 'davidcooper123'
        },
        {
            username: 'juanmartinez',
            email: 'juanmartinez@gmail.com',
            password: 'juanmartinez123'
        },
        {
            username: 'jacobcrook',
            email: 'jacobcrook@gmail.com',
            password: 'jacobcrook123'
        },
        {
            username: 'dennisamber',
            email: 'dennisamber@gmail.com',
            password: 'dennisamber123'
        },
        {
            username: 'estherhoward',
            email: 'estherhoward@gmail.com',
            password: 'estherhoward123'
        },
        {
            username: 'courtneyhenry',
            email: 'courtneyhenry@gmail.com',
            password: 'courtneyhenry123'
        },
        {
            username: 'codyfisher',
            email: 'codyfisher@gmail.com',
            password: 'codyfisher123'
        },
        {
            username: 'cameronwill',
            email: 'cameronwill@gmail.com',
            password: 'cameronwill123'
        },
        {
            username: 'theresawebb',
            email: 'theresawebb@gmail.com',
            password: 'theresawebb123'
        },
        {
            username: 'jennywilson',
            email: 'jennywilson@gmail.com',
            password: 'jennywilson123'
        },
        {
            username: 'janecooper',
            email: 'janecooper@gmail.com',
            password: 'janecooper123'
        }
    ]);
}
