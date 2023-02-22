import { Route, Switch } from 'react-router-dom';
import SpotList from './SpotList';
import SingleSpot from './SingleSpot';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spot';


const Spots =()=>{    


 return(
    <>
     <Switch>
     <Route exact path="/">
     <SpotList/>
     </Route>
     <Route path="/spots/:spotId">
     <SingleSpot/>
     </Route>
     </Switch>
    </>
 )

}

export default Spots;