const db = require('../../database');

const messageController = {
  post: (req, res) => {
    const data = req.body;
    console.log('Sending email to:', data.sellerEmail);
    console.log('Vehicle ID:', data.vehicleId);
    console.log('Message:', data.message);
    console.log('First name:', data.firstName);
    console.log('Last name:', data.lastName);
    console.log('Email:', data.email);
    console.log('Phone:', data.phone);
    console.log('Enroll:', data.enroll);
    res.status(201).send('');
  }
};

module.exports.messageController = messageController;
