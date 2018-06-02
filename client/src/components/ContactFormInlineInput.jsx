import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  display: block;
`;

const InlineDiv = styled.div`
  display: inline-block;
`;

const ContactFormInlineInput = ({ name, label, type, placeholder }) => {
  return (
    <InlineDiv>
      <div className="form-group">
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
        >
        </Input>
      </div>
    </InlineDiv>
  );
};

export default ContactFormInlineInput;
