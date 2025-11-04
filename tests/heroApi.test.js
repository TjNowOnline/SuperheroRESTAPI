const request = require('supertest');
const app = require('../app');

describe('Superhero REST API', () => {
    // Timeout øges lidt, fordi ekstern API kan tage lidt tid
    jest.setTimeout(10000);

    describe('GET /superheroes', () => {
        it('skal returnere en liste af helte', async () => {
            const res = await request(app).get('/superheroes');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
        });
    });

    describe('GET /superheroes/:id', () => {
        it('skal returnere en specifik helt ud fra ID', async () => {
            const res = await request(app).get('/superheroes/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('skal returnere 404 hvis helt ikke findes', async () => {
            const res = await request(app).get('/superheroes/999999');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /favorites', () => {
        it('skal kunne tilføje en favorit med note', async () => {
            const res = await request(app)
                .post('/favorites')
                .send({ id: 1, note: 'Min yndlingshelt!' });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message');
        });

        it('skal returnere 400 hvis note mangler', async () => {
            const res = await request(app)
                .post('/favorites')
                .send({ id: 2 });
            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /favorites', () => {
        it('skal returnere en liste af favoritter', async () => {
            const res = await request(app).get('/favorites');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('DELETE /favorites/:id', () => {
        it('skal kunne slette en favorit', async () => {
            const res = await request(app).delete('/favorites/1');
            expect(res.statusCode).toBe(200);
        });

        it('skal returnere 404 hvis favorit ikke findes', async () => {
            const res = await request(app).delete('/favorites/999999');
            expect(res.statusCode).toBe(404);
        });
    });
});
