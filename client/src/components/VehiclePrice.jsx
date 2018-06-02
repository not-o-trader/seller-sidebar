import React from 'react';
import styled from 'styled-components';

const InnerDiv = styled.div`
  width: 95%;
  margin: 0 auto;
`;

class VehiclePrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InnerDiv>
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
        </InnerDiv>
      </div>
    );
  }
}

export default VehiclePrice;
