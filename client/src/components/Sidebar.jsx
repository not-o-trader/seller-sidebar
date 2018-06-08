import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import VehiclePrice from './VehiclePrice.jsx';
import SellerInfo from './SellerInfo.jsx';
import ContactForm from './ContactForm.jsx';

const Wrapper = styled.div`
  max-width: 100%;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875em;
  a:link, a:visited, a:hover, a:active {
    color: blue;
  }
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sendSellerEmail = this.sendSellerEmail.bind(this);
  }

  componentDidMount() {
    this.getInfo(1);
  }

  getInfo(vehicleId) {
    axios.get(`/api/seller/${vehicleId}`)
      .then(({ data }) => {
        this.setState(data);
      })
      .catch((error) => {
        console.log('Error getting data:', error);
      });
  }

  sendSellerEmail(data) {
    const extra = {
      vehicleId: this.state.vehicleId,
      sellerEmail: this.state.sellerEmail
    };
    data = Object.assign({}, data, extra);
    axios.post('/api/seller/email', data)
      .then(res => console.log('Successfully sent email'))
      .catch(err => console.error('Error sending email:', err));
  }

  render() {
    return (
      <Wrapper>
        <VehiclePrice price={this.state.vehiclePrice} />
        <hr />
        <SellerInfo
          logo={this.state.sellerLogoUrl}
          name={this.state.sellerName}
          phone={this.state.sellerPhone}
          address={this.state.sellerAddress}
          city={this.state.sellerCity}
          state={this.state.sellerState}
          zip={this.state.sellerZip}
          website={this.state.sellerWebsite}
        />
        <ContactForm
          make={this.state.vehicleMake}
          model={this.state.vehicleModel}
          year={this.state.vehicleModelYear}
          email={this.state.sellerEmail}
          price={this.state.vehiclePrice}
          send={this.sendSellerEmail}
        />
      </Wrapper>
    );
  }
}

export default Sidebar;
