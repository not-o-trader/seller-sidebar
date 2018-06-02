import React from 'react';

class VehiclePrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.props.price}</div>
        <div>
          <p>
            <a href='#'>Is this in the fair market range?</a>
          </p>
        </div>
        <div>
          <p>
            <a href='#'>$ Arrange Financing</a> <a href='#'>Calculate payment</a>
          </p>
        </div>
      </div>
    );
  }
}

export default VehiclePrice;
