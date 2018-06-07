const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

const app = express();

const { sellersController } = require('./controllers/sellers');
const { messageController } = require('./controllers/message');

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/seller/:vehicleId', sellersController.get);
app.post('/api/seller/email', messageController.post);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
