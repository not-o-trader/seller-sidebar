// Generate and save "logos" (just images with text) for the dealers
//
// const { run } = require('./generate-logos');
// run(100);

const fs = require('fs');
const path = require('path');
const util = require('util');
const pg = require('pg');
const childProcess = require('child_process');

const exec = util.promisify(childProcess.exec);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

const getSellers = async () => {
  const pg = require('pg');
  const client = new pg.Client({
    user: 'jbm',
    database: 'autotrader'
  });

  await client.connect();

  const data = await client.query('select * from sellers');

  return data.rows;
};

const run = async (destination = null) => {
  if (destination === null) {
    destination = path.join(__dirname, 'images');
  }

  const sellers = await getSellers();

  if (!(await exists(destination))) {
    await mkdir(destination);
  }

  for (const row of sellers) {
    const txt = row.name.replace(/'/g, "\\'") + ' ' + row.brand;
    const out = path.join(destination, 'dealer-' + row.id + '.png');
    const cmd = `
    convert \
      -size 250x250 xc:white -fill blue -gravity center \
      -pointsize 16 -font "/Library/Fonts/Arial.ttf" -draw "text 0,0 '${txt}'" \
      ${out}
    `;
    await exec(cmd);
  }
};

module.exports = { getSellers, run };
