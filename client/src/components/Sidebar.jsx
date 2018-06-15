import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import VehiclePrice from './VehiclePrice.jsx';
import SellerInfo from './SellerInfo.jsx';
import ContactForm from './ContactForm.jsx';
import PaymentCalculator from './PaymentCalculator.jsx';

const Wrapper = styled.div`
  min-width: 350px;
  max-width: 450px;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875em;
  a:link, a:visited, a:hover, a:active {
    color: blue;
  }
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: props.vehicleId,
      modalActive: false
    };
    this.sendSellerEmail = this.sendSellerEmail.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getInfo(this.state.vehicleId);
  }

  getInfo(vehicleId) {
    axios.get(`http://75.101.193.74:5500/api/seller/${vehicleId}`)
      .then(({ data }) => {
        this.setState(data);
      })
      .catch((error) => {
        console.log('Error getting data:', error);
      });
  }

  sendSellerEmail(data) {
    data = {
      ...data,
      vehicleId: this.state.vehicleId,
      sellerEmail: this.state.sellerEmail
    };
    axios.post('http://75.101.193.74:5500/api/seller/email', data)
      .then(res => console.log('Successfully sent email'))
      .catch(err => console.error('Error sending email:', err));
  }

  toggleModal() {
    const active = this.state.modalActive;
    this.setState({ modalActive: !active });
  }

  render() {
    return (
      <Wrapper>
        {this.state.modalActive &&
         <PaymentCalculator
           price={this.state.vehiclePrice}
           toggle={this.toggleModal}
         >
         </PaymentCalculator>}
        <VehiclePrice
          price={this.state.vehiclePrice}
          toggleModal={this.toggleModal}
        />
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
