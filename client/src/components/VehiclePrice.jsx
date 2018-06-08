import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const Info = styled.div`
  font-size: 14px;
`;

const FinancingLink = styled.a`
  margin-right: 10px;
`;

const PaymentsLink = styled.a`
  float: right;
`;

const KBB = styled.div`
  margin-top: -8px;
  float: left;
`;

const FMR = styled.div`
  margin: auto 0;
`;

class VehiclePrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <h3>{this.props.price}</h3>
        <Info>
          <div>
            <KBB>
              <img src="KBB_Badge.png" />
            </KBB>
            <FMR>
              <a href='#'>Is this price in the Fair Market Range?</a>
            </FMR>
          </div>
          <div>
            <p>
              <FinancingLink href='#'>$ Arrange Financing <span className="fas fa-external-link-alt"></span></FinancingLink> 
              <PaymentsLink href='#'><span className="fas fa-calculator"></span> Calculate payment</PaymentsLink>
            </p>
          </div>
        </Info>
      </Wrapper>
    );
  }
}

export default VehiclePrice;
