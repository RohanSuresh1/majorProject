import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherStationsContext = React.createContext({
  currentWeatherStation: null,
  setCurrentWeatherStation: () => {},
  allWeatherStationData: [],
  setAllWeatherStationData: () => {},
  viewType: '',
  setViewType: () => {}
});
export const WeatherStationsContextProvider = props => {
  const [currentWeatherStation, setCurrentWeatherStation] = useState('');
  const [allWeatherStations, setAllWeatherStations] = useState(null);
  const [allWeatherStationData, setAllWeatherStationData] = useState([]);
  const [historicData, setHistoricData] = useState([]);
  const [ws, setWs] = useState();
  const [viewType, setViewType] = useState('LIVE');
  let wsObj;
  console.log(allWeatherStationData);
  console.log(historicData);
  useState(() => {
    if (wsObj) return;
    axios.defaults.withCredentials = true;
    axios
      .get('https://weatherapp-api.azurewebsites.net/api/Sensor/GetLiveData')
      .then(response => {
        const wsUrl = response.data.token;
        const wsObj = new WebSocket(wsUrl);

        wsObj.onopen = event => {
          console.log('connected now to hub');
        };
        wsObj.onmessage = function (event) {
          try {
            if (event.type === 'message') {
              const json = JSON.parse(event.data);
              setAllWeatherStationData(prevState => [...prevState, json]);
            }
          } catch (err) {
            console.log(err);
          }
        };
        wsObj.onclose = function () {
          console.log('closed');
        };
        setWs(wsObj);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    const currentWeatherStationID = allWeatherStations?.filter(
      item => item.weatherStationName === currentWeatherStation
    )[0].weatherStationID;
    if ((viewType === 'HISTORIC' && historicData.length > 0) || viewType === 'LIVE') return;
    let endDate = new Date();
    let startDate = new Date(new Date().setDate(new Date().getDate() - 15));
    console.log(startDate);
    endDate = `${String(endDate.getUTCFullYear())}-${String(endDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(endDate.getDate()).padStart(2, '0')}`;
    startDate = `${String(startDate.getUTCFullYear())}-${String(startDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(startDate.getDate()).padStart(2, '0')}`;
    axios.defaults.withCredentials = true;
    axios
      .get(
        `https://weatherapp-api.azurewebsites.net/api/Sensor/GetSensorReadingBetweenDates?weatherStationId=1&startDate=${startDate}&endDate=${endDate}`,
        {
          weatherStationId: currentWeatherStationID,
          startDate,
          endDate
        }
      )
      .then(response => {
        const dataDictionary = {};
        response.data.map(item => {
          console.log(item);
          const modifiedDate = item.readingDay.substring(0, 10);
          if (!dataDictionary.hasOwnProperty(`${modifiedDate} W${item.weatherStationId}`))
            dataDictionary[[`${modifiedDate} W${item.weatherStationId}`]] = {
              TimeStamp: modifiedDate,
              WeatherStationId: item.weatherStationId
            };
          const modifiedSensorType = item.sensorTypeName.replace(/ /g, '').replace('Sensor', '');
          dataDictionary[[`${modifiedDate} W${item.weatherStationId}`]][[modifiedSensorType]] =
            item.reading;
        });
        const weatherData = Object.keys(dataDictionary).map(item => dataDictionary[[item]]);
        setHistoricData(weatherData);
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [viewType]);
  const contextValue = {
    currentWeatherStation: currentWeatherStation,
    setCurrentWeatherStation: setCurrentWeatherStation,
    allWeatherStations: allWeatherStations,
    setAllWeatherStations: setAllWeatherStations,
    allWeatherStationData: allWeatherStationData,
    setAllWeatherStationData: setAllWeatherStationData,
    weatherStationWebSocket: ws,
    viewType: viewType,
    setViewType: setViewType,
    historicData: historicData
  };

  return (
    <WeatherStationsContext.Provider value={contextValue}>
      {props.children}
    </WeatherStationsContext.Provider>
  );
};

export default WeatherStationsContext;