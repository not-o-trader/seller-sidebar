// Generate random (fake) vehicle seller info and insert it into PostgreSQL
//
// const { run } = require('./generate-sellers');
// run(100);

const names = [
  'Golden State',
  'Mr. Smith\'s',
  'Silver Star',
  'Awesome Cars',
  'Coolmobiles',
  'Wheels 2 Go',
  'Cars4u',
  'Mobilizr',
  'Best Spin',
  'Neighborhood Vehicle Merchant'
];

const brands = [
  'Cadillac',
  'Chevrolet',
  'GMC',
  'Buick',
  'Honda',
  'BMW',
  'Mercedes Benz',
  'Toyota',
  'Ferrari',
  'Mazda'
];

const cities = [
  ['Los Angeles', 'CA', '90013'],
  ['Playa Vista', 'CA', '90094'],
  ['Westchester', 'CA', '90045'],
  ['Inglewood', 'CA', '90304'],
  ['San Francisco', 'CA', '94016'],
  ['Seattle', 'WA', '98101'],
  ['Chicago', 'IL', '60007'],
  ['New York', 'NY', '10001'],
  ['San Diego', 'CA', '22434'],
  ['Portland', 'OR', '97035']
];

const streets = [
  'First St',
  'Second St',
  'Third St',
  'Fourth St',
  'Acme St',
  'Somewhere Blvd',
  'Automall Dr',
  'Smith St',
  'Park Dr',
  'Main St'
];

const randomElement = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const generatePhoneNumber = () => {
  let result = '1-555-';
  for (let i = 0; i < 3; i++)
    result += Math.floor(Math.random() * 10);
  result += '-';
  for (let i = 0; i < 4; i++)
    result += Math.floor(Math.random() * 10);
  return result;
};

const generateStreetAddress = () => {
  const digits = Math.floor(Math.random() * 5) + 1;
  let result = '';
  for (let i = 0; i < digits; i++) {
    result += Math.floor(Math.random() * 9).toString();
  }
  return result;
};

const generateSellerRow = () => {
  const name = randomElement(names);
  const email = (Math.random() > 0.5 ? 'joe' : 'jane')
    + '@'
    + name.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
    + '.com';
  const [city, state, zip] = randomElement(cities);
  return [
    name,
    randomElement(brands),
    generateStreetAddress() + ' ' + randomElement(streets),
    city,
    state,
    zip,
    email,
    generatePhoneNumber()
  ];
};

const generateSellerRows = function*(count = 100) {
  for (let i = 0; i < count; i++) {
    yield generateSellerRow();
  }
};

const run = async (count = 100) => {
  const query = `
    insert into sellers (
      name,
      brand,
      address,
      city,
      state,
      zip,
      email,
      phone
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const pg = require('pg');
  const client = new pg.Client({
    user: 'jbm',
    database: 'autotrader'
  });

  await client.connect();

  for (const row of generateSellerRows(100)) {
    await client.query(query, row);
  }

  await client.end();
};

module.exports = { generateSellerRow, generateSellerRows, run };
