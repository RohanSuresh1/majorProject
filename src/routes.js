

import Dashboard from "pages/Dashboard.js";
import UserView from "pages/UserView";
import Sensor from "pages/Sensor";
import Changepass from "pages/Changepass";

 

 const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  
  {
    collapse: true,
    name: "Pages",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/Sensor",
        name: "Sensor",
        mini: "Sen",
        component: <Sensor />,
        layout: "/admin",
      },
      {
        path: "/UserView",
        name: "UserView",
        mini: "US",
        component: <UserView />,
        layout: "/admin",
      },
      {
        path: "/Changepass",
        name: "Changepass",
        mini: "CP",
        component: <Changepass />,
        layout: "/admin",
      },
    ],
  },
 
];

export default routes;
