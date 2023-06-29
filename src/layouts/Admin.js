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
import { useEffect,useContext,useState } from "react";
import React from "react";
// javascript plugin used to create scrollbars on windows
//import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
//import Footer from "components/Footer/Footer.js";
//import Sidebar from "components/Sidebar.js";
import Sidebar from "components/Sidebar/Sidebar";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";//
import axios from "axios";
import AuthContext from "contextApi/AuthContext";



import routes from "routes.js";

var ps;

function Admin(props) {
const [weatherStationSelected,setWeatherStationSelected]=useState("")

  const location = useLocation();

  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [sidebarMini, setSidebarMini] = React.useState(false);
  const mainPanel = React.useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const weatherDropdownOptions=authCtx.userDetails?.weatherStations?.map(item=>{
    return(
      [item.weatherStationID,item.weatherStationName]
    
    )
   
  })
//console.log(weatherDropdownOptions)
  useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get('https://weatherapp-api.azurewebsites.net/api/User/GetUserById?userId='+authCtx.loggedUserId)
      .then(response => {
        //console.log(response.data); // Display the response data in the console
        const user = response.data;
        if (user) {
          //console.log('Login successful');
          authCtx.login(user); // Display success message in the console
        
        } else {
          setErrorMessage('Wrong username or password');
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data); // Display the response data in the console
          console.log(error.response.status); // Display the HTTP status code in the console
          console.log(error.response.headers); // Display the response headers in the console
        }
      });
  },[])

  React.useEffect(() => {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   document.documentElement.className += " perfect-scrollbar-on";
    //   document.documentElement.classList.remove("perfect-scrollbar-off");
    //   ps = new PerfectScrollbar(mainPanel.current);
    // }
    // return function cleanup() {
    //   if (navigator.platform.indexOf("Win") > -1) {
    //     ps.destroy();
    //     document.documentElement.className += " perfect-scrollbar-off";
    //     document.documentElement.classList.remove("perfect-scrollbar-on");
    //   }
    // };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    //console.log(routes)
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      console.log(prop)
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path}  element={() => <prop.component weatherStationSelected={weatherStationSelected} />}  key={key} exact />
          //<Route path={prop.path} element={prop.component} weatherStationSelected={weatherStationSelected} key={key} exact />
      
        );
      } else {
        return null;
      }
    });
  };

  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar {...location} handleMiniClick={handleMiniClick} options={weatherDropdownOptions} 
        changeHandler={(val)=>setWeatherStationSelected(val)}/>
        <Routes>{getRoutes(routes)}</Routes>
        {
          // we don't want the Footer to be rendered on full screen maps page
          // location.pathname.indexOf("full-screen-map") !== -1 ? null : (
          //   <Footer fluid />
          // )
        }
      </div>
      
    </div>
  );}

export default Admin;
