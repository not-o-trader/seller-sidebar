import React from 'react';
import { shallow, mount } from 'enzyme';

import Sidebar from '../components/Sidebar.jsx';
import ContactForm from '../components/ContactForm.jsx';

describe('<ContactForm />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <ContactForm
        make="Cadillac"
        model="ATS"
        year="2016"
        email="fake@example.com"
        price={40000.00}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('uses its `send` property', () => {
    const send = jest.fn();
    const wrapper = mount(
      <ContactForm
        make="Cadillac"
        model="ATS"
        year="2016"
        email="fake@example.com"
        price={40000.00}
        send={send}
      />
    );

    wrapper.find('button#send-seller-email').simulate('submit');
    expect(send).toHaveBeenCalled();
  });
});
