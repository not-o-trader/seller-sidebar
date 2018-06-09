import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  display: block;
  font-size: 14px;
  line-height: 21px;
  margin: 10px 0;
`;

const Optional = styled.small`
  color: grey;
`;

const FormInput = ({ name, label, type, placeholder, optional, value, handleChange }) => {
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
          value={value}
          onChange={handleChange}
        >
        </Input>
      </div>
    </div>
  );
};

export default FormInput;
