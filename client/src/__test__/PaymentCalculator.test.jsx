import React from 'react';
import { shallow, mount } from 'enzyme';

import PaymentCalculator from '../components/PaymentCalculator.jsx';

describe('<PaymentCalculator />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <PaymentCalculator price={40000.00} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calculates', () => {
    const wrapper = mount(
      <PaymentCalculator price={40000.00} />
    );

    wrapper.setState({
      downPayment: 10000.00,
      tradeInValue: 5000.00,
      amountOwedOnTrade: 2000.00
    });

    wrapper.find('button#payment-calculator-submit').simulate('click');
    expect(wrapper.state().totalLoan).toEqual(27000.00);
  });

  it('resets its state', () => {
    const wrapper = mount(
      <PaymentCalculator price={40000.00} />
    );

    wrapper.setState({ downPayment: 10000.00 });

    wrapper.find('button#payment-calculator-reset').simulate('click');
    expect(wrapper.state().downPayment).toEqual(0.00);
  });
});
