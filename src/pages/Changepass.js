import AuthContext from 'contextApi/AuthContext';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

const ChangePasswordForm = () => {
  axios.defaults.withCredentials = true;
  const authCtx = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = authCtx.loggedUserId;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const payload = {
      UserId: userId,
      CurrentPassword : currentPassword,
      NewPassword: newPassword,
    };

    try {
      const response = await axios.post(
        'https://weatherapp-api.azurewebsites.net/api/Auth/ChangePassword',
        payload
      );

      if (response.status === 200) {
        // Password changed successfully
        console.log('Password changed successfully');

        // Update the password in the login API

        // Reset form fields
        setCurrentPassword('');
        setNewPassword('');
      } else {
        // Handle the error
        console.log('Password change failed');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Change Password</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleChangePassword}>
          <FormGroup>
            <Label for="currentPassword">Current Password:</Label>
            <Input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password:</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Change Password
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ChangePasswordForm;
