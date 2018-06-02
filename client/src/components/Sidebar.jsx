import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import VehiclePrice from './VehiclePrice.jsx';
import SellerInfo from './SellerInfo.jsx';
import ContactForm from './ContactForm.jsx';

const SidebarDiv = styled.div`
  max-width: 100%;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <SidebarDiv>
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
        />
      </SidebarDiv>
    );
  }
}

export default Sidebar;
