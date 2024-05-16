import build from '../src/app.js';

describe('Healthcheck', () => {
    test('GET / should return 200 OK', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe('OK');
    });
});
