// Generate random (fake) vehicle info and insert it into PostgreSQL
//
// const { run } = require('./generate-vehicle');
// run(100);

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

const vehicles = [
  ['Cadillac', 'ATS'],
  ['Cadillac', 'XT5'],
  ['GMC', 'Sierra'],
  ['Chevrolet', 'Corvette'],
  ['Buick', 'Regal'],
  ['BMW', 'X3'],
  ['Mercedes-Benz', 'C-Class'],
  ['Honda', 'Civic'],
  ['Toyota', 'Camry'],
  ['Mazda', 'CX-3'],
  ['Ferrari', '488 Pista']
];

const randomElement = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const generatePrice = (make) => {
  let price = 10000 + (Math.random() * 80000);
  if (make === 'Ferrari') {
    price *= 2;
  }
  return price;
};

const generateSeller = (maxId = 100) => {
  return Math.floor(Math.random() * maxId);
};

const generateVehicleRow = () => {
  const [make, model] = randomElement(vehicles);
  const year = randomElement(years);
  const price = generatePrice(make);
  const seller = generateSeller(100);
  return [make, model, year, price, seller];
};  

const generateVehicleRows = function*(count = 100) {
  for (let i = 0; i < count; i++) {
    yield generateVehicleRow();
  }
};

const run = async (count = 100) => {
  const query = `
    insert into vehicles (
      make,
      model,
      model_year,
      price,
      seller_id
    )
    values ($1, $2, $3, $4, $5)
  `;

  const pg = require('pg');
  const client = new pg.Client({
    user: 'jbm',
    database: 'autotrader'
  });

  await client.connect();

  for (const row of generateVehicleRows(100)) {
    await client.query(query, row);
  }

  await client.end();
};

module.exports = { generateVehicleRow, generateVehicleRows, run };
