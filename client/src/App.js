import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Editprofile from './pages/Editprofile'
import Friendprofile from './pages/Friendprofile'
import Dashboard from './pages/Dashboard'
import Loading from './pages/Loading'
import Activitypage from './pages/ActivityPage'
import NoMatch from "./pages/NoMatch";
import Nav2 from "./components/Nav/Nav2";

import UserContext from "./utils/userContext";
import API from "./utils/API"
import { useAuth0 } from "@auth0/auth0-react";
// import { db } from "../../models/user";


function App() {
const [dbUser, setDbUser]=useState({});
const { isAuthenticated, user, isLoading } = useAuth0();


const pullFromDb = async () => {await API.getUserByEmail(user.email).then(userInfo => {
  if(!userInfo.data) {
    API.saveUser(user);
    window.location.replace('/editprofile')
  }
  setDbUser(userInfo.data);
  });
}
useEffect(() => {
  if(!user) return;
pullFromDb();
}, [isAuthenticated]);

if (isLoading || (isAuthenticated && !dbUser.email)){
  return(
    <Loading/>
  )
}
  
 
  return (
    <Router>
      <div id="master">
      <UserContext.Provider value={{dbUser}}>
        <Nav2 />
        {isAuthenticated && dbUser.email && dbUser.signedUp ? 
        <Switch>
          <Route exact path={["/", "/home"]} component={Home}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/editprofile">
            <Editprofile pullFromDb = {pullFromDb}/>
          </Route>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/activity/:id" component={Activitypage}/>
          <Route exact path="/profile/:id" component={Friendprofile}/>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        : isAuthenticated && dbUser.email && !dbUser.signedUp ?
        <Switch>
          <Route exact path={["/", "/home"]} component={Home}/>
          <Route path="/editprofile">
            <Editprofile pullFromDb = {pullFromDb}/>
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        :
        <Home />}
            </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
