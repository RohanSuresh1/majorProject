import React, { useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col,
    Row,
    Form
  } from "reactstrap";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send a reset password email
    console.log('Reset password email sent to:', email);
    // Reset the email field
    setEmail('');
  };

  return (
    <div >
      <div >
        <form onSubmit={handleSubmit}>
          {/* <label>Email:</label> */}
          <Input
                      placeholder="Email-ID"
                      type="text"
                      value={email}
                      onChange={handleEmailChange} required
                    />
          {/* <input type="email" value={email} onChange={handleEmailChange} required /> */}
          <Button block className="btn-round mb-3" color="warning" type="submit">
                    Reset Password
            </Button>
          {/* <button type="submit">Reset Password</button> */}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
