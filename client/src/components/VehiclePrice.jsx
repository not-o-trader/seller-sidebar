import React from 'react';
import styled from 'styled-components';
import { formatMoney } from 'accounting';

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
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
    this.handleCalculatorClick = this.handleCalculatorClick.bind(this);
  }

  handleCalculatorClick(e) {
    e.preventDefault();
    this.props.toggleModal();
  }

  render() {
    return (
      <Wrapper>
        <h3>{formatMoney(this.props.price)}</h3>
        <div>
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
              <PaymentsLink
                href='#'
                id="show-payment-calculator"
                onClick={this.handleCalculatorClick}
              >
                <span className="fas fa-calculator"></span> Calculate payment
              </PaymentsLink>
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default VehiclePrice;
