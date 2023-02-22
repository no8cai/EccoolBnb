// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
// import SingleSpot from "./components/Spots/SingleSpot";
import ManageCenter from "./components/Users";
import './index.css'
import ErrornotFind from "./components/Errors/Error404";
import LandingFooter from "./components/Footer/LandingFooter";
import SingleSpot from "./components/Spots/SingleSpot";
import Searchpage from "./components/Search";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);
    


  return (
    <div className="rootchild">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route path='/search/:searchItem' >
        <Searchpage />
        </Route>
        <Route path='/spots/:spotId'>
            <SingleSpot/>
        </Route>
        <Route exact path={"/"}>
        <Spots/>
        </Route>
        <Route path={["/hosting", "/createlisting","/editlisting/:spotId","/hosting/reviews","/createreview"]}>
        <ManageCenter/>
        </Route>
        <Route>
          <ErrornotFind/>
        </Route>
        </Switch>
        )}
    </div>

  );
}

export default App;