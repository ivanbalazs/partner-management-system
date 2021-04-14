const faker = require('faker');

const compTypes = ['LP', 'LLP', 'LLC', 'PLLC', 'Corp.', 'Inc.'];
const cities = new Set();
for (let i = 0; i < 1000; i++) {
    cities.add(faker.address.city());
}
const cityCnt = cities.size;
const partners = [];
for (let i = 0; i < 25; i++) {
    partners.push({
        name: faker.company.companyName(),
        company_type: faker.datatype.number({ min: 1, max: compTypes.length }),
        tax_id: faker.vehicle.vin(),
        registry_id: faker.vehicle.vin(),
        city: faker.datatype.number({ min: 1, max: cityCnt }),
        address: faker.address.streetAddress(),
        phone_number: faker.phone.phoneNumber(),
        bank_account: faker.finance.account(),
        note: faker.lorem.sentence(),
    });
}
const partnerCols = Object.keys(partners[0]);

module.exports = (db) => {
    db.serialize(() => {
        db.run(`CREATE TABLE company_type (
            id INTEGER PRIMARY KEY,
            name TEXT
        )`);
        db.run(`CREATE TABLE city (
            id INTEGER PRIMARY KEY,
            name TEXT
        )`);
        db.run(`CREATE TABLE partner (
            id INTEGER PRIMARY KEY,
            name TEXT,
            company_type INTEGER,
            tax_id TEXT,
            registry_id TEXT,
            city INTEGER,
            address TEXT,
            phone_number TEXT,
            bank_account TEXT,
            note TEXT
        )`);

        db.run(`INSERT INTO company_type (name) VALUES ${compTypes.map(() => '(?)').join(',')}`, compTypes);
        db.run(`INSERT INTO city (name) VALUES ${[ ...cities ].map(() => '(?)').join(',')}`, cities);
        const stmt = db.prepare(`INSERT INTO partner (${partnerCols.join(',')}) VALUES (${partnerCols.map(_ => '?').join(',')})`);
        partners.forEach(i => {
            stmt.run(Object.values(i));
        });
    });
}
