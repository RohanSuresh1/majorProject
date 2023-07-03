import React, { useState, useEffect } from 'react';
let logoutTimer;

const AuthContext = React.createContext({
  isLoggedIn: false,
  userDetails:null,
  loggedUserId:null,
  login: token => {},
  logout: () => {}
});
const retrieveStoredUserId=()=>{
    const storedUserId=localStorage.getItem("WS_UID")
    return storedUserId;
}

export const AuthContextProvider = props=>{
    const [userDetails,setUserDetails]=useState({})
    const [loggedUserId,setloggedUserId]=useState(retrieveStoredUserId())
    const loginHandler = (userDetails)=> {
        setloggedUserId(userDetails.userId)
        localStorage.setItem("WS_UID",userDetails.userId)
        setUserDetails(userDetails)
    }
    const contextValue ={
        userDetails:userDetails,
        isLoggedIn: false,
        login: loginHandler,
        loggedUserId:loggedUserId,
        logout: () => {}
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}
export default AuthContext;