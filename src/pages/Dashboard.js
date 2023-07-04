
import AuthContext from 'contextApi/AuthContext';
import {useContext } from 'react';
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
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
  const authCtx = useContext(AuthContext);
  const wStationCtx=useContext(WeatherStationsContext);
  console.log(wStationCtx.currentWeatherStation);
  
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
        </div>
    );
  
  
}

export default Dashboard;