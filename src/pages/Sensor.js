/*!

=========================================================
* Paper Dashboard PRO React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function Sensor() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Sensor Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                   
                      <th>Sensor Name</th>
                      <th className="text-center">Unit Value</th>
                      <th className="text-center">Maximum Value</th>
                      <th className="text-center">Minimum Value</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     
                      <td>Temperature Sensor</td>
                      <td className="text-center">23</td>
                      <td className="text-center">40</td>
                      <td className="text-center">18</td>
                      
                    </tr>
            </tbody>      
          </Table>
          </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Sensor ;