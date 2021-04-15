const fastify = require('fastify')({logger: true});
const path = require('path');
const db = require('./server/db');

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'build'),
});
fastify.register(require('fastify-cors'), {
    origin: '*',
})

const getRows = queryStr => async (req, resp) => {
    try {
        const result = await db.query(queryStr);
        resp.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    } catch (e) {
        resp.code(500).send('Bad query');
    }
}

fastify.get('/', (req, resp) => resp.sendFile('index.html'));
fastify.get('/company-type', getRows('select * from company_type'));
fastify.get('/city', getRows('select * from city'));
fastify.get('/partner', getRows('select * from partner'));
fastify.delete('/partner/:id', async (req, resp) => {
    try {
        await db.query('DELETE FROM partner where id = ?', req.params.id);
        resp.code(200);
    } catch (e) {
        resp.code(500);
    } finally {
        resp.send({});
    }
});

(async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();
