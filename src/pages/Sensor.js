import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button,
  Row,
  Col,
} from 'reactstrap';
import WeatherStationsContext from "contextApi/WeatherStationsContext";
import AuthContext from "contextApi/AuthContext";

const SensorTable = () => {
  const [sensorData, setSensorData] = useState([]);

  const authCtx= useContext(AuthContext);
  const wStationCtx = useContext(WeatherStationsContext);
  const currentWeatherStationID = wStationCtx?.allWeatherStations?.filter(
    item => item.weatherStationName === wStationCtx.currentWeatherStation
    )[0].weatherStationID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://weatherapp-api.azurewebsites.net/api/Sensor/GetSensorsByWeatherStationId?weatherStationId=${currentWeatherStationID}`);
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, [wStationCtx.currentWeatherStation]);

  const handleUpdate = (sensorId) => {
    // Perform the update operation for the specific sensor
    console.log(`Updating sensor with ID: ${sensorId}`);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Sensor Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="text-center">Unit</th>
                    <th className="text-center">Max Threshold</th>
                    <th className="text-center">Min Threshold</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((sensor, index) => (
                    <tr key={index}>
                      <td>{sensor.name}</td>
                      <td className="text-center">{sensor.units}</td>
                      <td className="text-center">{sensor.maxThreshold}</td>
                      <td className="text-center">{sensor.minThreshold}</td>
                      <td>
                        <Button color="primary" onClick={() => handleUpdate(sensor.senorTypeId)}>
                          Update
                        </Button>
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
  );
};

export default SensorTable;
