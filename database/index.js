const pg = require('pg');

const client = new pg.Client({
  user: 'jbm',
  database: 'autotrader'
});

client.connect();

const sellerInfoQuery = `
  select
      v.id as vehicle_id,
      v.make as vehicle_make,
      v.model as vehicle_model,
      v.model_year as vehicle_model_year,
      v.price as vehicle_price_raw,
      cast(v.price as money) as vehicle_price,
      s.id as seller_id,
      s.name as seller_name,
      s.brand as seller_brand,
      s.address as seller_address,
      s.city as seller_city,
      s.state as seller_state,
      s.zip as seller_zip,
      s.phone as seller_phone,
      s.email as seller_email,
      s.logo_url as seller_logo_url
  from
      vehicles as v
      join sellers as s on v.seller_id = s.id
  where
      v.id = $1
`;

const getSellerInfo = (vehicleId) => {
  return client.query(sellerInfoQuery, [vehicleId])
    .then((result) => {
      if (result.rowCount > 1) {
        console.warn('More than 1 row found for vehicle.id', vehicleId);
      }
      return result.rows[0];
    });
};

module.exports = { client, getSellerInfo };
