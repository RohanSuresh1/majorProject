import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  ButtonGroup
} from 'reactstrap';

import 'assets/css/ro.css';
import WeatherStationsContext from 'contextApi/WeatherStationsContext';

const AdminNavbar = props => {
  const { options, changeHandler } = { ...props };
  const wStationCtx = useContext(WeatherStationsContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleOptionSelect = option => {
    setSelectedOption(option[1]);
    changeHandler(option[1]);
    wStationCtx.setCurrentWeatherStation(option[1]);
  };

  useEffect(() => {
    if (selectedOption == null && options?.length > 0) {
      setSelectedOption(options[0][1]);
    }
  }, [options]);

  const handleLogout = () => {
    axios
      .post('https://weatherapp-api.azurewebsites.net/api/Auth/Logout')
      .then(response => {
        if (response.status === 200) {
          // Logout successful
          // Redirect to the login page
          navigate('/');
        } else {
          // Handle logout failure
          // For example, display an error message
          console.error('Logout failed');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Logout error:', error);
      });
  };

  return (
    <Navbar color='light' light expand='md'>
      <UncontrolledDropdown>
        <DropdownToggle caret color='success' id='dropdownMenuButton' type='button'>
          {selectedOption}
        </DropdownToggle>

        <DropdownMenu aria-labelledby='dropdownMenuButton'>
          {options?.map(item => (
            <DropdownItem key={item[0]} onClick={() => handleOptionSelect(item)}>
              {item[1]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>

      <div className='ml-auto' style={{ display: 'flex', columnGap: '2em' }}>
        {location.pathname.includes('/admin/dashboard') && (
          <ButtonGroup>
            <Button
              className={`btn-round ${wStationCtx.viewType === 'LIVE' ? 'active' : ''}`}
              color='info'
              outline
              type='button'
              onClick={() => {
                if (wStationCtx.viewType === 'HISTORIC') wStationCtx.setViewType('LIVE');
              }}
            >
              Live
            </Button>
            <Button
              className={`btn-round ${wStationCtx.viewType === 'HISTORIC' ? 'active' : ''}`}
              color='info'
              outline
              type='button'
              onClick={() => {
                if (wStationCtx.viewType === 'LIVE') wStationCtx.setViewType('HISTORIC');
              }}
            >
              Historic
            </Button>
          </ButtonGroup>
        )}

        <button className='btn btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;