import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

import "assets/css/ro.css";
import WeatherStationsContext from "contextApi/WeatherStationsContext";

const AdminNavbar=(props)=> {
  const {options,changeHandler}={...props}
  const wStationCtx=useContext(WeatherStationsContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option[1]);
    changeHandler(option[1]);
    wStationCtx.setCurrentWeatherStation(option[1])
  };
useEffect(()=>{
  if(options?.length>0)
  setSelectedOption(options[0][1])
},[options])
  return (
    
    <Navbar color="light" light expand="md">
      <UncontrolledDropdown>
        <DropdownToggle caret color="success" id="dropdownMenuButton" type="button">
          {selectedOption}
        </DropdownToggle>

        <DropdownMenu aria-labelledby="dropdownMenuButton">
        {options?.map(item=>{
          //console.log(item[1])
          return(
          <DropdownItem key={item[0]} onClick={() => handleOptionSelect(item)}>
           {item[1]}
          </DropdownItem>
          )
        })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
}

export default AdminNavbar;
