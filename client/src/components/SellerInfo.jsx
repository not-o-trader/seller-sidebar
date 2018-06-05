import React from 'react';
import styled from 'styled-components';

const SellerInfoDiv = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #d4d4d4;
  margin-bottom: 15px;
`;

const InnerDiv = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const BoldP = styled.p`
  font-weight: bold;
`;

const DivFloat = styled.div`
  float: left;
  margin-right: 10px;
`;

const SellerButton = styled.button`
  width: 95%;
  font-size: 14px;
  display: block;
  line-height: 21px;
  box-shadow: rgb(0, 0, 0, 0.1);
  border-bottom-left-radius: 3.5px;
  border-bottom-right-radius: 3.5px;
  border-top-left-radius: 3.5px;
  border-top-right-radius: 3.5px;
`;

const SellerInfo = ({ logo, name, phone, address, city, state, zip, website }) => {
  const mapsAddr = `${address}, ${city}, ${state} ${zip}`;
  const mapsLink = `https://maps.google.com/maps/place/${mapsAddr}`;
  return (
    <SellerInfoDiv>
      <InnerDiv>
        {logo && <img src={logo} alt={name} />}
        <h2>{name}</h2>
        <div>
          <BoldP>{phone}</BoldP>
        </div>
        <div>
          <DivFloat>
            <a href={mapsLink}>
              <span className="glyphicon">&#xe062;</span>
            </a>
          </DivFloat>
          <div>
            <p>
              <a href={mapsLink}>
                {address} {city}, {state} {zip}
              </a>
            </p>
          </div>
        </div>
        <div>
          <p>
            <a href="#">View our inventory</a>
          </p>
        </div>
        <div>
          <p>
            <a href={website}>
              <SellerButton>Visit Dealer Website <span className="glyphicon glyphicon-share"></span></SellerButton>
            </a>
            {/* <a href="#">Visit Dealer Website</a> */}
          </p>
        </div>
      </InnerDiv>
    </SellerInfoDiv>
  );
};

export default SellerInfo;
