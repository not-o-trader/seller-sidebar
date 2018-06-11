import React from 'react';
import styled from 'styled-components';
import { formatMoney } from 'accounting';

import FormInput from './FormInput.jsx';

const Wrapper = styled.div`
  position: absolute;
  width: 95%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #d4d4d4;
  background-color: white;
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
  outline-width: 0;
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
      price: props.price || 0,
      downPayment: 0,
      tradeInValue: 0,
      amountOwedOnTrade: 0,
      estimatedPayment: 0,
      totalFinanced: 0,
      totalInterest: 0,
      totalLoan: 0
    };
    this.state = { ...this.initialState };
    this.handleClose = this.handleClose.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRateChange = this.handleChange.bind(this, 'interestRate');
    this.handlePriceChange = this.handleChange.bind(this, 'price');
    this.handleDownPaymentChange = this.handleChange.bind(this, 'downPayment');
    this.handleTradeChange = this.handleChange.bind(this, 'tradeInValue');
    this.handleOwedChange = this.handleChange.bind(this, 'amountOwedOnTrade');
    this.handleMonthsClick = this.handleMonthsClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const price = props.price || state.price;
    if (typeof price === 'number') {
      // const downPayment = price * 0.2;
      return { ...state, price };
    }
    return state;
  }

  recalculate() {
    const { price, downPayment, tradeInValue, amountOwedOnTrade } = this.state;
    const loan = price - downPayment - tradeInValue + amountOwedOnTrade;
    const payment = Math.ceil(loan / this.state.months);
    // TODO: Interest etc.
    this.setState({
      totalFinanced: Math.ceil(loan),
      totalLoan: Math.ceil(loan), // FIXME
      estimatedPayment: Math.ceil(payment)
    });
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggle();
  }

  handleReset(e) {
    e.preventDefault();
    e.stopPropagation();
    const state = {
      ...this.initialState,
      price: this.props.price || 0,
      totalFinanced: 0,
      totalLoan: 0,
      estimatedPayment: 0
    };
    this.setState(state, () => this.recalculate());
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.recalculate();
  }

  handleChange(prop, event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (typeof value === 'string') {
      if (value.match(/^[0-9]*$/)) {
        value = +value;
      } else {
        console.warn(`Non-numeric value entered for ${prop}`);
      }
    }
    this.setState({ [prop]: value }, () => this.recalculate());
  }

  handleMonthsClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = event.target.value;
    this.setState({ months: +value });
  }

  render() {
    return (
      <Wrapper id="payment-calculator-modal">
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
              value={this.state.price}
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
              <Calculated>{formatMoney(this.state.price)}</Calculated>
            </div>
            <div>
              <p>Down Payment</p>
              <Calculated>- {formatMoney(this.state.downPayment)}</Calculated>
            </div>
            <div>
              <p>Trade-In Value</p>
              <Calculated>- {formatMoney(this.state.tradeInValue)}</Calculated>
            </div>
            <div>
              <p>Amount Owed on Trade</p>
              <Calculated>{formatMoney(this.state.amountOwedOnTrade)}</Calculated>
            </div>
            <div>
              <p>Total Financed</p>
              <Calculated>{formatMoney(this.state.totalFinanced)}</Calculated>
            </div>
            <div>
              <p>Total Interest</p>
              <Calculated>{formatMoney(this.state.totalInterest)}</Calculated>
            </div>
            <div>
              <p>Total Loan</p>
              <Calculated>{formatMoney(this.state.totalLoan)}</Calculated>
            </div>
            <p>
              *Estimated payments are for informational purposes only and don't
              account for tax, title and fees or represent a guarantee of credit
              from the seller. Such estimates are not an offer or commitment to
              lend.
            </p>
            <div>
              <ResetButton
                id="payment-calculator-reset"
                onClick={this.handleReset}
              >
                Reset
              </ResetButton>
              <CalculateButton
                id="payment-calculator-submit"
                onClick={this.handleSubmit}
              >
                Calculate
              </CalculateButton>
            </div>
          </form>
        </Inner>
      </Wrapper>
    );
  }
}

export default PaymentCalculator;
