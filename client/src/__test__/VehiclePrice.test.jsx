import React from 'react';
import { shallow } from 'enzyme';

import VehiclePrice from '../components/VehiclePrice.jsx';

describe('<VehiclePrice />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <VehiclePrice />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
