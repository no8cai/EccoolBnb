import { Route, Switch, NavLink } from 'react-router-dom';
import ListManage from "./ListManager";
import SpotForm from '../Spots/SpotForm';
import EditSpot from '../Spots/EditSpot';
import CreateSpot from '../Spots/CreateSpot';

const ManageCenter=()=>{

    return(
        <>
        <Switch>
          <Route path={'/hosting'}>
          <ListManage/>
          </Route>
          {/* <Route path={'/hosting/reviews'}>
          <ListManage/>
          </Route> */}
          <Route exact path={'/createlisting'}>
          <CreateSpot/>
          </Route>
          <Route exact path={'/editlisting/:spotId'}>
          <EditSpot/>
          </Route>
        </Switch>
         
        </>    
    )
}

export default ManageCenter;