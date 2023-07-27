import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import WeatherStationsContext from 'contextApi/WeatherStationsContext';
import AuthContext from 'contextApi/AuthContext';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [selectedRole, setSelectedRole] = useState({});
  const [roles, setRoles] = useState([]);
  const [rolesShown, setRolesShown] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [selectedWeatherStationId, setSelectedWeatherStationId] = useState(1);

  const [editUserDetails, setEditUserDetails] = useState({});
  const [usersNotInWeatherStation, setUsersNotInWeatherStation] = useState([]);
  const [addUserFieldPattern, setAddUserFieldPattern] = useState('');
  const [userDropdownShown, setUserDropdownShown] = useState(false);
  const authCtx = useContext(AuthContext);
  const wStationCtx = useContext(WeatherStationsContext);
  const currentWeatherStationID = wStationCtx?.allWeatherStations?.filter(
    item => item.weatherStationName === wStationCtx.currentWeatherStation
  )[0].weatherStationID;
  console.log(currentWeatherStationID,wStationCtx.allWeatherStations,wStationCtx.currentWeatherStation);
  axios.defaults.withCredentials = true;
  function fetchUserData(fetchRolesFlag = false) {
    axios
      .get(
        `https://weatherapp-api.azurewebsites.net/api/User/GetAllUsers?weatherStationId=${currentWeatherStationID}`
      )
      .then(response => {
        const { data } = response;
        setUsers(data);
        if (fetchRolesFlag) {
          axios
            .get('https://weatherapp-api.azurewebsites.net/api/Role/GetAllRoles')
            .then(response => {
              const { data: rolesData } = response;
              setRoles(rolesData);
            })
            .catch(error => {
              console.log('An error occurred:', error);
            });
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  }

  useEffect(() => {
    if (!wStationCtx.currentWeatherStation) return;
    fetchUserData(true);
  }, [wStationCtx.currentWeatherStation]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstName.match(/^[A-Za-z]+$/)) {
      setFirstNameError('First name should contain only letters');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.match(/^[A-Za-z]+$/)) {
      setLastNameError('Last name should contain only letters');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!contactNumber.match(/^\d{12}$/)) {
      setContactNumberError('Contact number should be 12 digits');
      isValid = false;
    } else {
      setContactNumberError('');
    }

    if (!emailId.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailIdError('Invalid email address');
      isValid = false;
    } else {
      setEmailIdError('');
    }

    if (!selectedRole) {
      setRoleError('Please select a role');
      isValid = false;
    } else {
      setRoleError('');
    }

    return isValid;
  };

  const handleAddUser = (currentWeatherStationID) => {
    if (validateForm()) {
      const roleId = selectedRole.roleId;
      const userData = {
        firstName,
        lastName,
        contactNumber,
        emailId,
        roleId: roleId,
        weatherStationId: currentWeatherStationID
      };
      console.log(selectedWeatherStationId)
      axios
        .post(
          `https://weatherapp-api.azurewebsites.net/api/User/CreateUser?CreatedBy=${authCtx.loggedUserId}`,
          userData
        )
        .then(response => {
          console.log('User added successfully:', response.data);
          // Clearing the form fields
          setFirstName('');
          setLastName('');
          setContactNumber('');
          setEmailId('');
          setSelectedRole({});
          setSelectedWeatherStationId('');
          // Closing the modal
          toggleModal();
          fetchUserData();
        })
        .catch(error => {
          console.error('Error adding user:', error);
          // Handle any errors that occur during the request
        });
    }
  };
  const handleDeleteUser = userId => {
    console.log(userId.userId);
    axios
      .post(
        `https://weatherapp-api.azurewebsites.net/api/User/DeleteUser?ModifiedBy=${authCtx.loggedUserId}&userId=${userId.userId}`
      )
      .then(response => {
        console.log('User Deleted successfully:', response.data);
        fetchUserData();
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle any errors that occur during the request
      });
  };
  const handleEditUser = () => {
    const UserDetailsToSend = { ...editUserDetails };
    UserDetailsToSend.roleId = roles.filter(
      role => role.name === UserDetailsToSend.roleName
    )[0].roleId;
    axios
      .post(
        `https://weatherapp-api.azurewebsites.net/api/User/UpdateUser?ModifiedBy=${authCtx.loggedUserId}`,
        UserDetailsToSend
      )
      .then(response => {
        console.log('User updated successfully:', response.data);
        // Clearing the form fields
        setFirstName('');
        setLastName('');
        setContactNumber('');
        setEmailId('');
        setSelectedRole({});
        setSelectedWeatherStationId('');
        // Closing the modal
        toggleModalEdit();
        fetchUserData();
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle any errors that occur during the request
      });
  };

  const toggleRole = role => {
    if (role === undefined) return;
    setSelectedRole(prev => (prev === role ? null : role));
    setRolesShown(false);
  };
  const toggleRoleEdit = role => {
    if (role === undefined) return;
    const updatedUser = { ...editUserDetails };
    updatedUser.roleName = role.name;
    setEditUserDetails(updatedUser);
    setRolesShown(false);
  };
  const toggleRoleUserDropdown = () => {
    setUserDropdownShown(prevState => !prevState);
  };
  useEffect(() => {
    console.log(addUserFieldPattern);
    if (addUserFieldPattern.length <= 3) return;

    const timeOutSearch = setTimeout(() => {
      console.log(addUserFieldPattern);
      axios
        .get(
          `https://weatherapp-api.azurewebsites.net/api/User/GetAllUsersNotInWeatherStation?weatherStationId=${currentWeatherStationID}&pattern=${addUserFieldPattern}`
        )
        .then(response => {
          const { data } = response;
          setUsersNotInWeatherStation(data);
          setUserDropdownShown(true);
        });
    }, 1000);
    return () => clearTimeout(timeOutSearch);
  }, [addUserFieldPattern]);
  console.log(userDropdownShown);
  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <div className='d-flex justify-content-between'>
                  <CardTitle tag='h4'>User Table</CardTitle>
                  {(authCtx.userDetails.roleCode === 'SUPER_ADMIN' ||
                    authCtx.userDetails.roleCode === 'ADMIN') && (
                    <>
                      <Button color='primary' onClick={toggleModal}>
                        Add User
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className='text-primary'>
                    <tr>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className='text-right'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.userId}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.emailId}</td>
                        <td>{user.roleName}</td>
                        <td className='text-right'>
                          {(authCtx.userDetails.roleCode === 'SUPER_ADMIN' ||
                            authCtx.userDetails.roleCode === 'ADMIN') && (
                            <>
                              <Button
                                className='btn-icon'
                                color='success'
                                id={`tooltipEdit${user.userId}`}
                                size='sm'
                                type='button'
                                onClick={() => {
                                  setEditUserDetails({
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    contactNumber: user.contactNumber,
                                    emailId: user.emailId,
                                    roleName: user.roleName,
                                    userId: user.userId
                                  });
                                  toggleModalEdit();
                                }}
                              >
                                <i className='fa fa-edit' />
                              </Button>{' '}
                              <UncontrolledTooltip delay={0} target={`tooltipEdit${user.userId}`}>
                                Edit
                              </UncontrolledTooltip>
                              <Button
                                className='btn-icon'
                                color='danger'
                                id={`tooltipDelete${user.userId}`}
                                size='sm'
                                type='button'
                                onClick={() => {
                                  handleDeleteUser({
                                    userId: user.userId
                                  });
                                }}
                              >
                                <i className='fa fa-times' />
                              </Button>{' '}
                              <UncontrolledTooltip delay={0} target={`tooltipDelete${user.userId}`}>
                                Delete
                              </UncontrolledTooltip>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Add User Modal */}
      {(authCtx.userDetails.roleCode === 'SUPER_ADMIN' ||
        authCtx.userDetails.roleCode === 'ADMIN') && (
        <>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
            <ModalBody>
              <Form className='d-flex flex-column'>
                <FormGroup
                  className='d-flex w-100 '
                  style={{ borderBottom: 'solid 0.5px #e7e7e7', paddingBottom: '0.6em' }}
                >
                  <Dropdown
                    id='input-dropdown'
                    isOpen={userDropdownShown}
                    toggle={() => toggleRoleUserDropdown()}
                    className='w-100'
                  >
                    <DropdownToggle tag='a'>
                      <InputGroup className='no-border w-100 float-right'>
                        <Input
                          placeholder='Search...'
                          type='text'
                          value={addUserFieldPattern}
                          onChange={e => {
                            setAddUserFieldPattern(e.target.value);
                          }}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='nc-icon nc-zoom-split' />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </DropdownToggle>
                    <DropdownMenu style={{ display: userDropdownShown ? 'block' : 'none' }}>
                      {usersNotInWeatherStation.map(item => (
                        <DropdownItem
                          onClick={() => {
                            setFirstName(item.firstName);
                            setLastName(item.lastName);
                            setEmailId(item.emailId);
                            setContactNumber(item.contactNumber);
                            setSelectedRole(roles.find(role => role.name === item.roleName));
                          }}
                        >
                          <div className='d-flex flex-row'>
                            <p>
                              <b>
                                {item.firstName} {item.lastName}
                              </b>
                            </p>
                            <p>{item.emailId}</p>
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                <FormGroup>
                  <Label for='firstName'>First Name</Label>
                  <Input
                    type='text'
                    id='firstName'
                    placeholder='Enter first name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  {firstNameError && <div className='error'>{firstNameError}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for='lastName'>Last Name</Label>
                  <Input
                    type='text'
                    id='lastName'
                    placeholder='Enter last name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                  {lastNameError && <div className='error'>{lastNameError}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for='contactNumber'>Contact Number</Label>
                  <Input
                    type='text'
                    id='contactNumber'
                    placeholder='Enter contact number'
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                  />
                  {contactNumberError && <div className='error'>{contactNumberError}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for='emailId'>Email ID</Label>
                  <Input
                    type='email'
                    id='emailId'
                    placeholder='Enter email ID'
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                  />
                  {emailIdError && <div className='error'>{emailIdError}</div>}
                </FormGroup>

                <FormGroup>
                  <Label for='role'>Role</Label>
                  <Dropdown id='role' isOpen={rolesShown} toggle={() => toggleRole()}>
                    <DropdownToggle
                      onClick={() => {
                        setRolesShown(true);
                      }}
                      caret
                    >
                      {Object.keys(selectedRole).length > 0 ? selectedRole.name : 'Select role'}
                    </DropdownToggle>
                    <DropdownMenu>
                      {roles.map(role => (
                        <DropdownItem
                          key={role.roleId}
                          onClick={() => {
                            toggleRole(role);
                          }}
                        >
                          {role.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  {roleError && <div className='error'>{roleError}</div>}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
              <Button color='primary' onClick={()=>{handleAddUser(currentWeatherStationID)}}>
                Add
              </Button>{' '}
              <Button color='secondary' onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}

      {/* Edit User Modal */}
      <Modal isOpen={modalEdit} toggle={toggleModalEdit}>
        <ModalHeader toggle={toggleModalEdit}>Edit User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='firstName'>First Name</Label>
              <Input
                type='text'
                id='firstName'
                placeholder='Enter first name'
                value={editUserDetails.firstName}
                onChange={e => setEditUserDetails(prev => ({ ...prev, firstName: e.target.value }))}
              />
              {firstNameError && <div className='error'>{firstNameError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for='lastName'>Last Name</Label>
              <Input
                type='text'
                id='lastName'
                placeholder='Enter last name'
                value={editUserDetails.lastName}
                onChange={e => setEditUserDetails(prev => ({ ...prev, lastName: e.target.value }))}
              />
              {lastNameError && <div className='error'>{lastNameError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for='contactNumber'>Contact Number</Label>
              <Input
                type='text'
                id='contactNumber'
                placeholder='Enter contact number'
                value={editUserDetails.contactNumber}
                onChange={e =>
                  setEditUserDetails(prev => ({ ...prev, contactNumber: e.target.value }))
                }
              />
              {contactNumberError && <div className='error'>{contactNumberError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for='emailId'>Email ID</Label>
              <Input
                type='email'
                id='emailId'
                placeholder='Enter email ID'
                value={editUserDetails.emailId}
                readOnly
              />
              {emailIdError && <div className='error'>{emailIdError}</div>}
            </FormGroup>

            <FormGroup>
              <Label for='role'>Role</Label>
              <Dropdown id='role' isOpen={rolesShown} toggle={() => toggleRoleEdit()}>
                <DropdownToggle
                  onClick={() => {
                    setRolesShown(true);
                  }}
                  caret
                >
                  {editUserDetails.roleName}
                </DropdownToggle>
                <DropdownMenu>
                  {roles.map(role => (
                    <DropdownItem
                      key={role.roleId}
                      onClick={() => {
                        toggleRoleEdit(role);
                      }}
                    >
                      {role.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {roleError && <div className='error'>{roleError}</div>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button color='primary' onClick={handleEditUser}>
            Save
          </Button>{' '}
          <Button color='secondary' onClick={toggleModalEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserView;