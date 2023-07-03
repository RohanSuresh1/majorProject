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
  const [message, setMessage] = useState(''); // State for success/error message
  const userId = authCtx.loggedUserId;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const payload = {
      UserId: userId,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    };

    try {
      const response = await axios.post(
        'https://weatherapp-api.azurewebsites.net/api/Auth/ChangePassword',
        payload
      );

      if (response.status === 200) {
        // Password changed successfully
        setMessage('Password changed successfully'); // Set success message


        // Reset form fields
        setCurrentPassword('');
        setNewPassword('');
      } else {
        // Handle the error
        setMessage('Password change failed'); // Set error message
      }
    } catch (error) {
      setMessage('An error occurred'); // Set error message
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
        <p>{message}</p> {/* Display success/error message */}
      </CardBody>
    </Card>
  );
};

export default ChangePasswordForm;
