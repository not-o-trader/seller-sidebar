const db = require('../../database');

const sellersController = {
  get: (req, res) => {
    const vehicleId = req.params.vehicleId;
    db.getSellerInfo(vehicleId)
      .then((result) => {
        const data = {
          vehicleId: result.vehicle_id,
          vehicleMake: result.vehicle_make,
          vehicleModel: result.vehicle_model,
          vehicleModelYear: result.vehicle_model_year,
          vehiclePriceRaw: result.vehicle_price_raw,
          vehiclePrice: result.vehicle_price,
          sellerId: result.seller_id,
          sellerName: result.seller_name,
          sellerBrand: result.seller_brand,
          sellerAddress: result.seller_address,
          sellerCity: result.seller_city,
          sellerState: result.seller_state,
          sellerZip: result.seller_zip,
          sellerPhone: result.seller_phone,
          sellerEmail: result.seller_email,
          sellerLogoUrl: result.seller_logo_url,
          sellerWebsite: '' // FIXME
        };
        res.status(200).json(data);
      })
      .catch((error) => {
        console.error(`Error getting seller info for ${vehicleId}`, error);
        res.status(500).send();
      });
  }
};

module.exports.sellersController = sellersController;
