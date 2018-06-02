import React from 'react';
import styled from 'styled-components';

import ContactFormInput from './ContactFormInput.jsx';
import ContactFormInlineInput from './ContactFormInlineInput.jsx';

const H2 = styled.h2`
  width: 90%;
  margin: 0 auto;
`;

const ContactFormDiv = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #d4d4d4;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  width: 90%;
  margin 0 auto;
`;

const TextArea = styled.textarea`
  display: block;
  width: 90%;
  font-size: 14px;
  line-height: 21px;
  margin auto;
`;

const DivFloat = styled.div`
  float: left;
`;

const PromoDiv = styled.div`
  width: 90%;
  margin: auto;
`;

const SubmitButton = styled.button`
  width: 90%;
  margin: 0 auto;
  display: block;
`;

const ContactForm = ({ year, make, model, price }) => {
  const placeholder = `Enter your message here. Maximum 250 characters`;
  let messageDefault = '';
  if (year && make && model && price) {
    messageDefault = `
    Hi, I'm interested in your ${year} ${make} ${model} listed on Not-O-Trader
    for ${price}. I'd like to get more information about this vehicle and
    confirm its availability.  
    `.trim().replace(/[\n ]+/g, ' ');
  }
  return (
    <ContactFormDiv>
      <H2>Email Seller</H2>
      <form>
        <Label htmlFor="message">Message</Label>
        <TextArea
          name="message"
          maxLength={250}
          rows={8}
          placeholder={placeholder}
          value={messageDefault}
        >
        </TextArea>
        {/* <div>
          <ContactFormInlineInput
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
          />
          <ContactFormInlineInput
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
          />          
        </div> */}
        <ContactFormInput
          name="firstName"
          label="First Name"
          type="text"
          placeholder="First Name"
        />
        <ContactFormInput
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Last Name"
        />
        <ContactFormInput
          name="emailAddress"
          label="Email"
          type="email"
          placeholder="Email"
        />
        <ContactFormInput
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder=""
          optional="true"
        />
        <PromoDiv>
          <DivFloat>
            <input type="checkbox" name="contactCheckbox"></input>
          </DivFloat>
          <div>
            Yes, I would like to receive updates, promotions, and discounts
            from Not-O-Trader and their affiliates.
          </div>
        </PromoDiv>
        <PromoDiv>
          <p>
            By using this service, you accept the terms of
            our Visitor Agreement
          </p>
        </PromoDiv>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </ContactFormDiv>
  );
};

export default ContactForm;
