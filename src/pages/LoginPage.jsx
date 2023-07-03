import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import ForgetPassword from "./Forgetpass";
import AuthContext from "contextApi/AuthContext";
//import 'assets/css/ro.css'

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx=useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("https://weatherapp-api.azurewebsites.net/api/Auth/Login", {
        username,
        password,
      })
      .then((response) => {
        const user = response.data;
        if (user) {
          console.log("Login successful");
          authCtx.login(user);
          navigate("/admin/dashboard");
        } else {
          setErrorMessage("Wrong username or password");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="gradient-background" />
      <Container>
        <Row>
          <Col
            className="ml-auto mr-auto"
            lg="6"
            md="7"
            style={{ marginLeft: "300px" }}
          >
            <Form className="form" onSubmit={handleLogin}>
              <Card className="card-login">
                <CardHeader className="login-card-header">
                  <h3 className="header text-center">Weather Station</h3>
                </CardHeader>
                <CardBody>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <br />
                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="btn-round mb-3"
                    color="warning"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Button
                    color="link"
                    className="btn-round mb-3"
                    onClick={toggleForgotPassword}
                  >
                    Forgot Password?
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={showForgotPassword} toggle={toggleForgotPassword}>
    <div className="modal-content">
      <ModalHeader toggle={toggleForgotPassword}>
        Forgot Password
      </ModalHeader>
      <ModalBody>
        <ForgetPassword />
      </ModalBody>
      <ModalFooter className="justify-content-center">
  <Button color="secondary" onClick={toggleForgotPassword}>
    Close
  </Button>
</ModalFooter>

    </div>

</Modal>


    </div>
  );
};

export default LoginPage;
