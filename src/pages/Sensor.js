import React, { useEffect, useState, useContext } from 'react';
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
  FormGroup,
  Input
} from 'reactstrap';
import WeatherStationsContext from 'contextApi/WeatherStationsContext';
import AuthContext from 'contextApi/AuthContext';

const SensorTable = () => {
  const [sensorData, setSensorData] = useState([]);

  const authCtx = useContext(AuthContext);
  const wStationCtx = useContext(WeatherStationsContext);
  const currentWeatherStationID = wStationCtx?.allWeatherStations?.filter(
    item => item.weatherStationName === wStationCtx.currentWeatherStation
  )[0].weatherStationID;
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://weatherapp-api.azurewebsites.net/api/Sensor/GetSensorsByWeatherStationId?weatherStationId=${currentWeatherStationID}`
        );

        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, [wStationCtx.currentWeatherStation]);
 
  const handleUpdate = async (sensorId) => {
    // Get the updated sensor data by filtering the sensorData array
    const Updatedsensor = sensorData.find((sensor) => sensor.sensorConfigId === sensorId);
  
    if (Updatedsensor) {
      try {
        // Make the API call to update the sensor thresholds
        const response = await axios.post(
          `https://weatherapp-api.azurewebsites.net/api/Sensor/UpdateSensorThresholds?sensorConfigId=${
            Updatedsensor.sensorConfigId}
            &weatherStationId=${currentWeatherStationID}&maxThreshold=${
              Updatedsensor.newMaxThreshold
              ? Updatedsensor.newMaxThreshold  
              : Updatedsensor.maxThreshold
            }&minThreshold=${
              Updatedsensor.newMinThreshold
              ? Updatedsensor.newMinThreshold  
              : Updatedsensor.minThreshold
            
            }&userId=${authCtx.loggedUserId}`
        );
  
        console.log('Sensor thresholds updated:', response.data);
  
        // Handle any necessary UI updates or notifications after successful update
      } catch (error) {
        console.error('Error updating sensor thresholds:', error);
        // Handle error and display an error message to the user
      }
    }
  };
  
  function isThresholdUpdated(newVal, oldVal) {
    if (+newVal !== +oldVal && newVal) return true;
    return false;
  }
  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Sensor Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='text-center'>Unit</th>
                    <th className='text-center'>Max Threshold</th>
                    <th className='text-center'>Min Threshold</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((sensor, index) => (
                    <tr key={index}>
                      <td>{sensor.name}</td>
                      <td className='text-center'>{sensor.units}</td>
                      <td>
                        <FormGroup>
                          <Input
                            type='number'
                            className='w-50 mx-auto text-center'
                            value={
                              sensor.newMaxThreshold ? sensor.newMaxThreshold : sensor.maxThreshold
                            }
                            onChange={e => {
                              const updatedVal = sensorData.map((item, item_index) => {
                                if (item_index === index) item.newMaxThreshold = e.target.value;
                                return item;
                              });
                              setSensorData(updatedVal);
                            }}
                            onClick={e => {
                              e.currentTarget.select();
                            }}
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup>
                          <Input
                            type='number'
                            className='w-50 mx-auto text-center'
                            value={
                              sensor.newMinThreshold ? sensor.newMinThreshold : sensor.minThreshold
                            }
                            onChange={e => {
                              const updatedVal = sensorData.map((item, item_index) => {
                                if (item_index === index) item.newMinThreshold = e.target.value;
                                return item;
                              });
                              console.log(updatedVal);
                              setSensorData(updatedVal);
                            }}
                            onClick={e => {
                              e.currentTarget.select();
                            }}
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <Button
                          color='primary'
                          className={`${
                            isThresholdUpdated(sensor.newMinThreshold, sensor.minThreshold) ||
                            isThresholdUpdated(sensor.newMaxThreshold, sensor.maxThreshold)
                              ? 'enabled'
                              : 'disabled'
                          }`}
                          onClick={() => handleUpdate(sensor.sensorConfigId)}
                        >
                          Update
                        </Button>{' '}
                        {/* The update button stays disabled until user makes an edit. This is for better readability */}
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