import React, { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
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
import axios from 'axios';
import AuthContext from "contextApi/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('https://weatherapp-api.azurewebsites.net/api/Auth/Login', { username, password })
      .then(response => {
        //console.log(response.data); // Display the response data in the console
        const user = response.data;
        if (user) {
          console.log('Login successful');
          authCtx.login(user); // Display success message in the console
          navigate('/Dashboard'); //do context api 
        } else {
          setErrorMessage('Wrong username or password');
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data); // Display the response data in the console
          console.log(error.response.status); // Display the HTTP status code in the console
          console.log(error.response.headers); // Display the response headers in the console
        }
      });
  };

  return (
    <div className="login-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="gradient-background" />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6" md="7" style={{ marginLeft: "300px" }}>
            <Form className="form" onSubmit={handleLogin}>
              <Card className="card-login" >
                <CardHeader className="login-card-header">
                  <h3 className="header text-center">Weather Station</h3>
                </CardHeader>
                <CardBody>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
