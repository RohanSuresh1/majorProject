import React, { useState,useEffect } from 'react';
import AuthContext from 'contextApi/AuthContext';
import {useContext } from 'react';
import axios from 'axios';
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
} from "reactstrap";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8,
} from "variables/charts.js";

import WeatherStationsContext from 'contextApi/WeatherStationsContext';

const Dashboard=(props)=> {
  console.log(props)
  const [errorMessage, setErrorMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const wStationCtx=useContext(WeatherStationsContext);
  console.log(authCtx);
  
  return (
  
        <div className="content">
          <Row>
            <Col md="3">
              <Card className="card-stats">
                <Col md="12">
                  <div className="numbers">
                    <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }} >Sensor1</p>
                    <CardTitle tag="p">Some value</CardTitle>
                    <p />
                  </div>
                  <CardFooter></CardFooter>
                </Col>
              </Card>
              <Card className="card-stats">
                <Col md="12">
                  <div className="numbers">
                    <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }} >Sensor</p>
                    <CardTitle tag="p">Some value</CardTitle>
                    <p />
                  </div>
                  <CardFooter></CardFooter>
                </Col>
              </Card>
              <Card className="card-stats">
                <Col md="12">
                  <div className="numbers">
                    <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }} >Sensor1</p>
                    <CardTitle tag="p">Some value</CardTitle>
                    <p />
                  </div>
                  <CardFooter></CardFooter>
                </Col>
              </Card>
              <Card className="card-stats">
                <Col md="12">
                  <div className="numbers">
                    <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }} >Sensor1</p>
                    <CardTitle tag="p">Some value</CardTitle>
                    <p />
                  </div>
                  <CardFooter></CardFooter>
                </Col>
              </Card>
            </Col>
            <Col md="9">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }} >
                  {wStationCtx.currentWeatherStation}
                  </CardTitle>
                  {/* <p className="card-category">All products that were shipped</p> */}
                </CardHeader>
                <CardBody style={{ height: "470px" }}>
                  <Col className="ml-auto mr-auto" md="12">
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                    {/* <Form>
                <InputGroup className="no-border">
                  <Input defaultValue="" placeholder="Search..." type="text" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form> */}
                    {/* <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          height: "300px",
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0,
                          },
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial",
                            },
                          ],
                        }}
                      /> */}
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Humidity</CardTitle>
                  <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px' }}>Current Humidity</p>
                </CardHeader>
                <CardBody style={{ height: "200px" }}>
                  <Doughnut
                    data={chartExample5.data}
                    options={chartExample5.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
              </Card>
            </Col>
  
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Temperature</CardTitle>
                  <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px' }}>Current Temperature</p>
                </CardHeader>
                <CardBody style={{ height: "200px" }}>
                  <Doughnut
                    data={chartExample6.data}
                    options={chartExample6.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
  
              </Card>
            </Col>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Air Pressure</CardTitle>
                  <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px' }}>Current Air Pressure</p>
                </CardHeader>
                <CardBody style={{ height: "200px" }}>
                  <Doughnut
                    data={chartExample7.data}
                    options={chartExample7.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
  
              </Card>
            </Col>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Rain</CardTitle>
                  <p className="card-category" style={{ fontWeight: 'bold', fontSize: '20px' }}>Current CM</p>
                </CardHeader>
                <CardBody style={{ height: "200px" }}>
                  <Doughnut
                    data={chartExample8.data}
                    options={chartExample8.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
  
              </Card>
            </Col>
          </Row>
  
  
          <Row>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">$34,657</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="success" pill>
                          +18%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">
                    total earnings in last ten quarters
                  </h6>
                  <Line
                    data={chartExample1.data}
                    options={chartExample1.options}
                    height={380}
                    width={826}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">Financial Statistics</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          size="sm"
                        >
                          <i className="nc-icon nc-simple-add" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">169</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="danger" pill>
                          -14%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">
                    total subscriptions in last 7 days
                  </h6>
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                    height={380}
                    width={828}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View all members</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="danger"
                          size="sm"
                        >
                          <i className="nc-icon nc-button-play" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">8,960</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="warning" pill>
                          ~51%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">total downloads in last 6 years</h6>
                  <Line
                    data={chartExample3.data}
                    options={chartExample3.options}
                    height={380}
                    width={826}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View more details</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="warning"
                          size="sm"
                        >
                          <i className="nc-icon nc-alert-circle-i" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="card-tasks">
                <CardHeader>
                  <CardTitle tag="h4">Tasks</CardTitle>
                  <h5 className="card-category">Backend development</h5>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip42906017"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip42906017"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip570363224"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip570363224"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/erik-lucatero-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip584875601"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip584875601"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip517629613"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip517629613"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/kaci-baum-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Using dummy content or fake information in the Web
                            design process can result in products with unrealistic
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip792337830"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip792337830"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip731952378"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731952378"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/joe-gardner-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            But I must explain to you how all this mistaken idea
                            of denouncing pleasure
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip825783733"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip825783733"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip285089652"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip285089652"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh spin" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">2021 Sales</CardTitle>
                  <p className="card-category">All products including Taxes</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-info" />
                    Tesla Model S <i className="fa fa-circle text-danger" />
                    BMW 5 Series
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" />
                    Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    );
  
  
}

export default Dashboard;