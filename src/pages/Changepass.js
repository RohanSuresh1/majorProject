import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [loggedInUserId] = useState(9); // Placeholder for the logged-in user ID
  const [userId, setUserId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (userId !== String(loggedInUserId)) {
      // User ID does not match the logged-in user
      console.log('Invalid user ID');
      return;
    }

    const payload = {
      userId,
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch('https://weatherapp-api.azurewebsites.net/api/Auth/ChangePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Password changed successfully
        console.log('Password changed successfully');

        // Update the password in the login API
        try {
          const loginResponse = await fetch('https://weatherapp-api.azurewebsites.net/api/Auth/Login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userId, // Assuming the username is the same as the user ID
              password: newPassword,
            }),
          });

          if (loginResponse.ok) {
            console.log('Password updated in the login API');
          } else {
            console.log('Failed to update password in the login API');
          }
        } catch (error) {
          console.log('An error occurred while updating password in the login API:', error);
        }

        // Reset form fields
        setUserId('');
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
    <form onSubmit={handleChangePassword}>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label>Current Password:</label>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
