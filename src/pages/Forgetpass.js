import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  Alert
} from "reactstrap";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      // Send reset password request to the API
      const response = await axios.post(
        'https://weatherapp-api.azurewebsites.net/api/Auth/ResetPassword',
        { EmailId : email }
      );

      // Handle the response
      console.log('Reset password email sent to:', email);
      setEmail('');
      setErrorMessage('');
    } catch (error) {
      // Handle error if the API request fails
      if (error.response) {
        setErrorMessage('Reset password email could not be sent. Please try again later.');
      } else {
        setErrorMessage('An error occurred while sending the reset password email. Please try again later.');
      }
      console.error('Error sending reset password email:', error);
    }
  };

  return (
    <div>
      {errorMessage && (
        <Alert color="danger">
          {errorMessage}
        </Alert>
      )}
      <Input
        placeholder="Email-ID"
        type="text"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <Button
        block
        className="btn-round mb-3"
        color="warning"
        onClick={handleButtonClick}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ForgetPassword;
