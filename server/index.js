const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')

require('dotenv').config();

const PORT = process.env.PORT || 5500;

const corsOptions = {
  origin: 'http://75.101.193.74',
  optionsSuccessStatus: 200
};

const app = express();

const { sellersController } = require('./controllers/sellers');
const { messageController } = require('./controllers/message');

app.use(helmet());
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/seller/:vehicleId', sellersController.get);
app.post('/api/seller/email', messageController.post);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
