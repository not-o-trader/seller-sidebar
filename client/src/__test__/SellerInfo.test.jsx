import React from 'react';
import { shallow } from 'enzyme';

import SellerInfo from '../components/SellerInfo.jsx';

describe('<SellerInfo />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <SellerInfo
        logo={null}
        name="Dealer"
        phone="5555555555"
        address="123 Acme St"
        city="Acme"
        state="CA"
        zip="12345"
        website="https://www.google.com"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
