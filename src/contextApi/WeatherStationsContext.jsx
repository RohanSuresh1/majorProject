import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherStationsContext = React.createContext({
  currentWeatherStation: null,
  setCurrentWeatherStation: () => {},
  allWeatherStationData: [],
  setAllWeatherStationData: () => {}
});
export const WeatherStationsContextProvider = props => {
  const [currentWeatherStation, setCurrentWeatherStation] = useState('');
  const [allWeatherStations, setAllWeatherStations] = useState(null);
  const [allWeatherStationData, setAllWeatherStationData] = useState([]);
  const [ws, setWs] = useState();
  let wsObj;
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
  const contextValue = {
    currentWeatherStation: currentWeatherStation,
    setCurrentWeatherStation: setCurrentWeatherStation,
    allWeatherStations: allWeatherStations,
    setAllWeatherStations: setAllWeatherStations,
    allWeatherStationData: allWeatherStationData,
    setAllWeatherStationData: setAllWeatherStationData,
    weatherStationWebSocket: ws
  };

  return (
    <WeatherStationsContext.Provider value={contextValue}>
      {props.children}
    </WeatherStationsContext.Provider>
  );
};

export default WeatherStationsContext;