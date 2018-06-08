import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #d4d4d4;
  margin-bottom: 15px;
`;

const Inner = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const Phone = styled.p`
  font-weight: bold;
`;

const Float = styled.div`
  float: left;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 7px 14px;
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
    <Wrapper>
      <Inner>
        {logo && <img src={logo} alt={name} />}
        <h2>{name}</h2>
        <div>
          <Phone>{phone}</Phone>
        </div>
        <div>
          <Float>
            <a href={mapsLink}>
              <span className="fas fa-map-marker-alt"></span>
            </a>
          </Float>
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
            <Button>
              <a href={website}>Visit Dealer Website <span className="fas fa-external-link-alt"></span></a>
            </Button>
          </p>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default SellerInfo;
