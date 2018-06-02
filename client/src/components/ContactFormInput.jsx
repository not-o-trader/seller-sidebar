import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: bold;
  width: 90%;
  display: block;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: 90%;
  font-size: 14px;
  line-height: 21px;
  margin: 0 auto;
`;

const Optional = styled.small`
  color: grey;
`;

const ContactFormInput = ({ name, label, type, placeholder, optional }) => {
  return (
    <div>
      <div className="form-group">
        <Label htmlFor={name}>
          {label} {optional && <Optional>(Optional)</Optional>}
        </Label>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
        >
        </Input>
      </div>
    </div>
  );
};

export default ContactFormInput;
