import { test } from 'node:test';
import { build } from '../src/app.js';
import { equal } from 'node:assert/strict';

await test('test', async (t) => {
    const app = await build();

    t.after(() => app.close());

    const res = await app.inject({
        method: 'GET',
        url: '/'
    });

    equal(res.statusCode, 200);
    equal(res.payload, '{"hello":"world"}');
    equal(res.headers['content-type'], 'application/json; charset=utf-8');
});
