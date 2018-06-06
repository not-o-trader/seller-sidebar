import React from 'react';
import styled from 'styled-components';

const InnerDiv = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const FinancingLink = styled.a`
  margin-right: 10px;
`;

const PaymentsLink = styled.a`
  float: right;
`;

const KBBDiv = styled.div`
  float: left;
`;

const FMRDiv = styled.div`
  margin: auto 0;
`;

class VehiclePrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InnerDiv>
          <h3>{this.props.price}</h3>
          <div>
            <KBBDiv>
              <img src="KBB_Badge.png" />
            </KBBDiv>
            <FMRDiv>
              <a href='#'>Is this price in the Fair Market Range?</a>
            </FMRDiv>
          </div>
          <div>
            <p>
              <FinancingLink href='#'>$ Arrange Financing <span className="fas fa-external-link-alt"></span></FinancingLink> 
              <PaymentsLink href='#'><span className="fas fa-calculator"></span> Calculate payment</PaymentsLink>
            </p>
          </div>
        </InnerDiv>
      </div>
    );
  }
}

export default VehiclePrice;
