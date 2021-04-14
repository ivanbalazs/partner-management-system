const fastify = require('fastify')({logger: true});
const path = require('path');
const db = require('./server/db');

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'build'),
});

fastify.get('/', (req, resp) => resp.sendFile('index.html'));
fastify.get('/company-type', db.getRows('select * from company_type'));
fastify.get('/city', db.getRows('select * from city'));
fastify.get('/partner', db.getRows('select * from partner'));

(async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();
