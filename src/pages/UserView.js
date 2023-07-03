import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
  DropdownItem,
} from "reactstrap";

function UserView() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "User" },
  ]);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [selectedWeatherStationId, setSelectedWeatherStationId] = useState(1);


  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("https://weatherapp-api.azurewebsites.net/api/User/GetAllUsers?weatherStationId=1")
      .then((response) => {
        const { data } = response;
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstName.match(/^[A-Za-z]+$/)) {
      setFirstNameError("First name should contain only letters");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.match(/^[A-Za-z]+$/)) {
      setLastNameError("Last name should contain only letters");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!contactNumber.match(/^\d{11}$/)) {
      setContactNumberError("Contact number should be 11 digits");
      isValid = false;
    } else {
      setContactNumberError("");
    }

    if (!emailId.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailIdError("Invalid email address");
      isValid = false;
    } else {
      setEmailIdError("");
    }

    if (!selectedRole) {
      setRoleError("Please select a role");
      isValid = false;
    } else {
      setRoleError("");
    }

    return isValid;
  };

  const handleAddUser = () => {
    if (validateForm()) {
     
      console.log("User Details:", {
        firstName,
        lastName,
        contactNumber,
        emailId,
        selectedRole,
      });

      // Clearing the form fields
      setFirstName("");
      setLastName("");
      setContactNumber("");
      setEmailId("");
      setSelectedRole(null);

      // Closing the modal
      toggleModal();
    }
  };

  const toggleRole = (role) => {
    setSelectedRole((prev) => (prev === role ? null : role));
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                  <CardTitle tag="h4">User Table</CardTitle>
                  <Button color="primary" onClick={toggleModal}>
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.emailId}</td>
                        <td>{user.roleName}</td>
                        <td className="text-right">
                          <Button
                            className="btn-icon"
                            color="success"
                            id={`tooltipEdit${user.userId}`}
                            size="sm"
                            type="button"
                          >
                            <i className="fa fa-edit" />
                          </Button>{" "}
                          <UncontrolledTooltip
                            delay={0}
                            target={`tooltipEdit${user.userId}`}
                          >
                            Edit
                          </UncontrolledTooltip>
                          <Button
                            className="btn-icon"
                            color="danger"
                            id={`tooltipDelete${user.userId}`}
                            size="sm"
                            type="button"
                          >
                            <i className="fa fa-times" />
                          </Button>{" "}
                          <UncontrolledTooltip
                            delay={0}
                            target={`tooltipDelete${user.userId}`}
                          >
                            Delete
                          </UncontrolledTooltip>
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
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && <div className="error">{firstNameError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && <div className="error">{lastNameError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="contactNumber">Contact Number</Label>
              <Input
                type="text"
                id="contactNumber"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              {contactNumberError && (
                <div className="error">{contactNumberError}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="emailId">Email ID</Label>
              <Input
                type="email"
                id="emailId"
                placeholder="Enter email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              {emailIdError && <div className="error">{emailIdError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Dropdown
                id="role"
                isOpen={selectedRole !== null}
                toggle={() => toggleRole()}
              >
                <DropdownToggle caret>
                  {selectedRole ? selectedRole.name : "Select role"}
                </DropdownToggle>
                <DropdownMenu>
                  {roles.map((role) => (
                    <DropdownItem
                      key={role.id}
                      onClick={() => toggleRole(role)}
                    >
                      {role.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {roleError && <div className="error">{roleError}</div>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="primary" onClick={handleAddUser}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserView;
