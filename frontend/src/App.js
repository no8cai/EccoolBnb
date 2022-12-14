// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
// import SingleSpot from "./components/Spots/SingleSpot";
import ManageCenter from "./components/Users";
import { fetchSpots } from "./store/spot";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);
    


  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {/* <ManageCenter/> */}
      {/* {isLoaded && (
        <Switch>
        </Switch>
      )} */}
      {/* <Switch> */}
        <Route exact 
        path={["/","/spots/:spotId"]}>
        <Spots/>
        </Route>
        <Route path={["/hosting", "/createlisting","/editlisting/:spotId","/hosting/reviews","/createreview"]}>
        <ManageCenter/>
        </Route>
      {/* </Switch>  */}
    </div>
  );
}

export default App;