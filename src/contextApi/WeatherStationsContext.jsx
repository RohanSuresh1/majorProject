import React,{useState,useEffect} from "react";

const WeatherStationsContext = React.createContext({
    currentWeatherStation: null,
    setCurrentWeatherStation : () => {}
});

export const WeatherStationsContextProvider = props => {
    const [currentWeatherStation,setCurrentWeatherStation]= useState('');

    const contextValue={
        currentWeatherStation:currentWeatherStation,
        setCurrentWeatherStation:setCurrentWeatherStation
    };

    return(
        <WeatherStationsContext.Provider value ={contextValue}>
            {props.children}
        </WeatherStationsContext.Provider>
    );
};

export default WeatherStationsContext;