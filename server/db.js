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
if (!process.argv[2] && fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
}

const db = new sqlite3.Database(dbFile);

(async () => {
    const dbFileSize = (await fs.promises.stat(dbFile)).size;
    if (dbFileSize === 0) {
        require('./initDb')(db);
    }
})();

const query = (query, params = []) => new Promise(async (resolve, reject) => {
    db.all(query, params, (err, rows) => err && reject(err) || resolve(rows));
});

module.exports = {
    db,
    query,
};
