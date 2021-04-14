/* global process */

const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

if (process.argv[2] && !fs.existsSync(process.argv[2])) {
    console.error(`DB file ${process.argv[2]} does not exist! Please specify an existing file, or leave empty to use default`);
    process.exit(1);
}
const dbFile = process.argv[2] || path.join(__dirname, '..', 'db.sqlite');
console.log(`Using DB file ${dbFile}}`);
fs.unlinkSync(dbFile);

const db = new sqlite3.Database(dbFile);

(async () => {
    const dbFileSize = (await fs.promises.stat(dbFile)).size;
    if (dbFileSize === 0) {
        require('./initDb')(db);
    }
})();

const query = query => new Promise(async (resolve, reject) => {
    db.all(query, (err, rows) => err && reject(err) || resolve(rows));
});

const getRows = queryStr => async (req, resp) => {
    try {
        const result = await query(queryStr);
        resp.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    } catch (e) {
        resp.code(500).send('Bad query');
    }
}

module.exports = {
    db,
    query,
    getRows,
};
