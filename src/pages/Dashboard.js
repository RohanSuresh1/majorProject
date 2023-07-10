import AuthContext from 'contextApi/AuthContext';
import { useEffect, useContext, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from 'reactstrap';
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8
} from 'variables/charts.js';
import DonutChart from 'charts/DonutChart';
import { LineChart_TrendAnalysis } from 'charts/LineChat';
import WeatherStationsContext from 'contextApi/WeatherStationsContext';
import LoadingIcon from "assets/img/extra/loading.gif";

function formatTitle(title) {
  title = title.replace(/([A-Z])/g, ' $1');
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title;
}
const LineCharts = ({ item, thisDataset }) => {
  return (
    <Row>
      <Col>
        <Card style={{ height: '20em' }}>
          <CardHeader>
            <CardTitle tag='h6'>{formatTitle(item)} Trend</CardTitle>
          </CardHeader>
          <CardBody>
            {Object.keys(thisDataset).length !== 0 ? (
              <Line data={thisDataset} options={chartExample1.options} />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img style={{ width: '4em', marginTop: '-3em' }} src={LoadingIcon} />
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

function getDataSetProperty(objKey) {
  let metric, color;
  switch (objKey) {
    case 'AirQuality':
      metric = 'PPM';
      color = '#4acccd';
      break;
    case 'Humidity':
      metric = '%';
      color = '#fcc468';
      break;
    case 'Temperature':
      metric = 'C';
      color = '#f17e5d';
      break;
  }
  return { metric, color };
}
const Dashboard = props => {
  const authCtx = useContext(AuthContext);
  const wStationCtx = useContext(WeatherStationsContext);
  const currentWeatherStation = wStationCtx.allWeatherStations?.find(
    station => station.weatherStationName === wStationCtx.currentWeatherStation
  );
  const wsData = wStationCtx?.allWeatherStationData?.filter(
    data => data.WeatherStationId === currentWeatherStation?.weatherStationID
  );
  console.log(wsData);

  const keysToIgnore = ['WeatherStationId', 'WeatherStationCode', 'Pressure', 'TimeStamp'];

  const currentData =
    wsData.length > 0
      ? wsData.at(-1)
      : {
          WeatherStationId: null,
          WeatherStationCode: null,
          Temperature: null,
          Humidity: null,
          Pressure: null,
          AirQuality: null
        };
  const consolidatedStreamingData = [...wsData];
  const chartDataSets = {},
    labels = [],
    variationData = {};

  consolidatedStreamingData?.map(item => {
    Object.keys(item).map(objKey => {
      if (objKey === 'TimeStamp') labels.push(item[[objKey]].substring(11, 16));
      if (keysToIgnore.indexOf(objKey) >= 0) return;
      const { metric, color } = getDataSetProperty(objKey);
      if (Object.keys(chartDataSets).indexOf(objKey) < 0)
        chartDataSets[[objKey]] = {
          label: objKey,
          borderColor: color,
          fill: true,
          backgroundColor: color,
          hoverBorderColor: color,
          borderWidth: 8,
          barPercentage: 0.4,
          data: []
        };
      chartDataSets[[objKey]].data.push(item[[objKey]]);

      if (Object.keys(variationData).indexOf(objKey) < 0)
        variationData[[objKey]] = {
          label: objKey,
          borderColor: color,
          fill: true,
          backgroundColor: color,
          hoverBorderColor: color,
          borderWidth: 8,
          barPercentage: 0.4,
          data: []
        };
      if (labels.length >= 1) {
        let deviation = chartDataSets[[objKey]].data.at(-1) - chartDataSets[[objKey]].data.at(-2);
        variationData[[objKey]].data.push(deviation);
      }
    });
  });
  const chartData = {
    labels: labels.slice(1, labels.length),
    datasets: Object.keys(variationData).map(keyObj => variationData[[keyObj]])
  };
  return (
    <div className='content mt-0'>
      <Row className='h-100'>
        <Col md='3'>
          {Object.keys(chartDataSets).length > 0 ? (
            Object.keys(chartDataSets).map(item => {
              const dataSetOption = {
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false,
                borderWidth: 3,
                barPercentage: 1.6,
                tension: 0.4,
                borderColor: chartDataSets[[item]].borderColor,
                data: chartDataSets[[item]].data.length > 0 ? [...chartDataSets[[item]].data] : []
              };
              const thisDataset = {
                labels: labels,
                datasets: [{ ...dataSetOption }]
              };
              return (
                <Row>
                  <Col>
                    <LineChart_TrendAnalysis item={formatTitle(item)} thisDataset={thisDataset} />{' '}
                  </Col>
                </Row>
              );
            })
          ) : (
            <>
              <LineCharts item={'Temperature'} thisDataset={{}} />
              <LineCharts item={'Humidity'} thisDataset={{}} />
              <LineCharts item={'AirQuality'} thisDataset={{}} />
            </>
          )}
        </Col>
        <Col md='9'>
          <Row>
            {Object.keys(currentData)?.map(objKey => {
              if (keysToIgnore.indexOf(objKey) < 0) {
                const { metric, color } = getDataSetProperty(objKey);
                return (
                  <Col md='4'>
                    <DonutChart
                      objKey={formatTitle(objKey)}
                      objVal={currentData[[objKey]]}
                      metric={metric}
                      bgColor={color}
                    />
                  </Col>
                );
              }
            })}
          </Row>
          <Row>
            <Col md='12'>
              <Card style={{ height: '41.3em' }}>
                <CardHeader>
                  <CardTitle
                    tag='h4'
                    style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}
                  >
                    {wStationCtx.currentWeatherStation}
                  </CardTitle>
                  {/* <p className="card-category">All products that were shipped</p> */}
                </CardHeader>
                <CardBody>
                  {/* <Col className='ml-auto mr-auto' md='12'> */}
                  <Bar data={chartData} options={chartExample4.options} />
                  {/* </Col> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

  );
};

export default Dashboard; 