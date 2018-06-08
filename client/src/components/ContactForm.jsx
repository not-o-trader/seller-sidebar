import React from 'react';
import styled from 'styled-components';

import ContactFormInput from './ContactFormInput.jsx';

const H2 = styled.h2`
  width: 95%;
  margin: 0 auto;
`;

const ContactFormDiv = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #d4d4d4;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  width: 95%;
  margin 10px auto;
`;

const TextArea = styled.textarea`
  display: block;
  width: 95%;
  font-size: 14px;
  line-height: 21px;
  margin 10px auto;
`;

const DivFloat = styled.div`
  float: left;
`;

const PromoDiv = styled.div`
  width: 95%;
  margin: 10px auto;
`;

const SubmitButton = styled.button`
  width: 95%;
  padding: 7px 14px;
  font-size: 14px;
  margin: 10px auto;
  display: block;
  color: white;
  background-color: rgb(232, 118, 0);
  line-height: 21px;
  box-shadow: rgb(0, 0, 0, 0.1);
  border-bottom-left-radius: 3.5px;
  border-bottom-right-radius: 3.5px;
  border-top-left-radius: 3.5px;
  border-top-right-radius: 3.5px;
`;

const Input = styled.input`
  margin-right: 20px;
`;

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      enroll: false
    };

    this.handleMessageChange = this.handleChange.bind(this, 'message');
    this.handleFirstNameChange = this.handleChange.bind(this, 'firstName');
    this.handleLastNameChange = this.handleChange.bind(this, 'lastName');
    this.handleEmailChange = this.handleChange.bind(this, 'email');
    this.handlePhoneChange = this.handleChange.bind(this, 'phone');
    this.handleEnrollChange = this.handleChange.bind(this, 'enroll');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state && state.message === '') {
      const { year, make, model, price } = props;
      if (year && make && model && price) {
        const message = `
        Hi, I'm interested in your ${year} ${make} ${model} listed on Not-O-Trader
        for ${price}. I'd like to get more information about this vehicle and
        confirm its availability.
        `.trim().replace(/[\n ]+/g, ' ');
        return Object.assign({}, state, { message });
      }
    }
    return state;
  }

  handleChange(prop, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [prop]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.send(this.state);
    this.setState({
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      enroll: false
    });
  }

  render() {
    const placeholder = 'Enter your message here. Maximum 250 characters';
    return (
      <ContactFormDiv>
        <H2>Email Seller</H2>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="message">Message</Label>
          <TextArea
            name="message"
            maxLength={250}
            rows={8}
            placeholder={placeholder}
            value={this.state.message}
            onChange={this.handleMessageChange}
          >
          </TextArea>
          <ContactFormInput
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            value={this.state.firstName}
            handleChange={this.handleFirstNameChange}
          />
          <ContactFormInput
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            value={this.state.lastName}
            handleChange={this.handleLastNameChange}
          />
          <ContactFormInput
            name="emailAddress"
            label="Email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            handleChange={this.handleEmailChange}
          />
          <ContactFormInput
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder=""
            optional="true"
            value={this.state.phone}
            handleChange={this.handlePhoneChange}
          />
          <PromoDiv>
            <DivFloat>
              <Input
                type="checkbox"
                name="contactCheckbox"
                value={this.state.enroll}
                onChange={this.handleEnrollChange}
              >
              </Input>
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
  }
}

export default ContactForm;
