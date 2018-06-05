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
            <p>
              <a href='#'>Is this in the fair market range?</a>
            </p>
          </div>
          <div>
            <p>
              <FinancingLink href='#'>$ Arrange Financing <span className="glyphicon glyphicon-share"></span></FinancingLink> 
              <PaymentsLink href='#'><span className="glyphicon glyphicon-modal-window"></span> Calculate payment</PaymentsLink>
            </p>
          </div>
        </InnerDiv>
      </div>
    );
  }
}

export default VehiclePrice;
