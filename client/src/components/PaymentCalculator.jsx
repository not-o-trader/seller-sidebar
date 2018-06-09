import React from 'react';
import styled from 'styled-components';

import FormInput from './FormInput.jsx';

const Wrapper = styled.div`
  position: relative;
  border: 1px solid #d4d4d4;
`;

const Inner = styled.div`
  width: 95%;
  margin: 10px auto;
`;

const Header = styled.div`
  margin-top: 10px;
`;

const Label = styled.div`
  margin: 10px 0;
  font-weight: bold;
`;

const Calculated = styled.p`
  text-align: right;
`;

const CloseButton = styled.button`
  float: right;
`;

const MonthsButton = styled.button`
  color: ${props => props.selected ? 'white' : 'blue'};
  background-color: ${props => props.selected ? 'blue' : 'white'};
`;

const ResetButton = styled.button`
  padding: 7px 14px;
  margin-left: 40%;
  font-size: 14px;
  color: blue;
  line-height: 21px;
  box-shadow: rgb(0, 0, 0, 0.1);
  border-bottom-left-radius: 3.5px;
  border-bottom-right-radius: 3.5px;
  border-top-left-radius: 3.5px;
  border-top-right-radius: 3.5px;
`;

const CalculateButton = styled.button`
  padding: 7px 14px;
  margin: auto 10px;
  font-size: 14px;
  color: white;
  background-color: rgb(232, 118, 0);
  line-height: 21px;
  box-shadow: rgb(0, 0, 0, 0.1);
  border-bottom-left-radius: 3.5px;
  border-bottom-right-radius: 3.5px;
  border-top-left-radius: 3.5px;
  border-top-right-radius: 3.5px;
`;

class PaymentCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      months: 60,
      interestRate: 0,
      price: props.price || '$0.00',
      priceRaw: props.priceRaw || 0,
      downPayment: 0,
      tradeInValue: 0,
      amountOwedOnTrade: 0,
      estimatedPayment: 0,
      totalFinanced: 0,
      totalInterest: 0,
      totalLoan: 0
    };
    this.state = Object.assign({}, this.initialState);
    this.handleClose = this.handleClose.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRateChange = this.handleChange.bind(this, 'interestRate');
    this.handlePriceChange = this.handleChange.bind(this, 'priceRaw');
    this.handleDownPaymentChange = this.handleChange.bind(this, 'downPayment');
    this.handleTradeChange = this.handleChange.bind(this, 'tradeInValue');
    this.handleOwedChange = this.handleChange.bind(this, 'amountOwedOnTrade');
    this.handleMonthsClick = this.handleMonthsClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const price = props.price || state.price;
    const priceRaw = props.priceRaw || state.priceRaw;
    if (typeof priceRaw === 'number') {
      const downPayment = priceRaw * 0.2;
      return Object.assign({}, state, { price, priceRaw, downPayment });
    }
    return state;
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggle();
  }

  handleReset(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState(this.initialState);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.error('PaymentCalculator.handleSubmit not implemented');
  }

  handleChange(prop, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [prop]: value });
  }

  handleMonthsClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = event.target.value;
    this.setState({ months: +value });
  }

  render() {
    return (
      <Wrapper>
        <Inner>
          <div>
            <Header>
              Calculator
              <CloseButton onClick={this.handleClose}>X</CloseButton>
            </Header>
          </div>
          <hr />
          <form>
            <div>
              <Label>Months</Label>
              <div>
                <MonthsButton
                  value="24"
                  onClick={this.handleMonthsClick}
                  selected={this.state.months === 24}
                >
                  24
                </MonthsButton>
                <MonthsButton
                  value="36"
                  onClick={this.handleMonthsClick}
                  selected={this.state.months === 36}
                >
                  36
                </MonthsButton>
                <MonthsButton
                  value="48"
                  onClick={this.handleMonthsClick}
                  selected={this.state.months === 48}
                >
                  48
                </MonthsButton>
                <MonthsButton
                  value="60"
                  onClick={this.handleMonthsClick}
                  selected={this.state.months === 60}
                >
                  60
                </MonthsButton>
                <MonthsButton
                  value="72"
                  onClick={this.handleMonthsClick}
                  selected={this.state.months === 72}
                >
                  72
                </MonthsButton>
              </div>
            </div>
            <FormInput
              name="interestRate"
              label="Interest Rate"
              type="number"
              value={this.state.interestRate}
              handleChange={this.handleRateChange}
            />
            <FormInput
              name="price"
              label="Price"
              type="number"
              value={this.state.priceRaw}
              handleChange={this.handlePriceChange}
            />
            <FormInput
              name="downPayment"
              label="Down Payment"
              type="number"
              value={this.state.downPayment}
              handleChange={this.handleDownPaymentChange}
            />
            <FormInput
              name="tradeInValue"
              label="Trade In Value"
              type="number"
              value={this.state.tradeInValue}
              handleChange={this.handleTradeChange}
            />
            <p>
              <a href='#'>Get your Kelly Blue Book Instant Cash Offer today</a>
            </p>
            <FormInput
              name="amountOwedOnTrade"
              label="Amount Owed on Trade"
              type="number"
              value={this.state.amountOwedOnTrade}
              handleChange={this.handleOwedChange}
            />
            <div>
              <p>Estimated Payment*</p>
              <p>
                ${this.state.estimatedPayment} / month for {this.state.months} at {this.state.interestRate}% APR.
              </p>
            </div>
            <div>
              <p>Price</p>
              <Calculated>{this.state.price}</Calculated>
            </div>
            <div>
              <p>Down Payment</p>
              <Calculated>- ${this.state.downPayment}</Calculated>
            </div>
            <div>
              <p>Trade-In Value</p>
              <Calculated>${this.state.tradeInValue}</Calculated>
            </div>
            <div>
              <p>Amount Owed on Trade</p>
              <Calculated>${this.state.amountOwedOnTrade}</Calculated>
            </div>
            <div>
              <p>Total Financed</p>
              <Calculated>${this.state.totalFinanced}</Calculated>
            </div>
            <div>
              <p>Total Interest</p>
              <Calculated>${this.state.totalInterest}</Calculated>
            </div>
            <div>
              <p>Total Loan</p>
              <Calculated>${this.state.totalLoan}</Calculated>
            </div>
            <p>
              *Estimated payments are for informational purposes only and don't
              account for tax, title and fees or represent a guarantee of credit
              from the seller. Such estimates are not an offer or commitment to
              lend.
            </p>
            <div>
              <ResetButton onClick={this.handleReset}>Reset</ResetButton>
              <CalculateButton onClick={this.handleSubmit}>Calculate</CalculateButton>
            </div>
          </form>
        </Inner>
      </Wrapper>
    );
  }
}

export default PaymentCalculator;
