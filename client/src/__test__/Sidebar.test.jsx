import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';

import Sidebar from '../components/Sidebar.jsx';
import VehiclePrice from '../components/VehiclePrice';
import SellerInfo from '../components/SellerInfo.jsx';
import ContactForm from '../components/ContactForm.jsx';
import PaymentCalculator from '../components/PaymentCalculator';

jest.mock('axios');

describe('<Sidebar />', () => {
  axios.get.mockResolvedValue({});
  axios.post.mockResolvedValue({});
  const shallowWrapper = shallow(<Sidebar />);
  const mountWrapper = mount(<Sidebar />);

  it('renders a <VehiclePrice /> component', () => {
    expect(shallowWrapper.find(VehiclePrice).length).toBe(1);
  });

  it('renders a <SellerInfo /> component', () => {
    expect(shallowWrapper.find(SellerInfo).length).toBe(1);
  });

  it('renders a <ContactForm /> component', () => {
    expect(shallowWrapper.find(ContactForm).length).toBe(1);
  });

  it('renders', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('does not render a <PaymentCalculator /> component', () => {
    expect(shallowWrapper.find(PaymentCalculator).length).toBe(0);
  });

  it('renders a <PaymentCalculator /> component on demand', () => {
    mountWrapper.find('a#show-payment-calculator').simulate('click');
    expect(mountWrapper.find('#payment-calculator-modal').length).toBeGreaterThan(0);
  });

  it('posts messages to the server', () => {
    jest.spyOn(axios, 'post');
    mountWrapper.find('button#send-seller-email').simulate('submit');
    expect(axios.post).toHaveBeenCalled();
  });
});
