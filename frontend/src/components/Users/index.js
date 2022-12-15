import { Route, Switch, NavLink } from 'react-router-dom';
import ListManage from "./ListManager";
import SpotForm from '../Spots/SpotForm';
import EditSpot from '../Spots/EditSpot';
import CreateSpot from '../Spots/CreateSpot';
import ReviewManage from './ReviewManager';
import CreateSpotReview from '../Reviews/CreateSpotReview';
import AddSpotImage from '../Images/SpotImage/AddSpotImage';
import "./Users.css"

const ManageCenter=()=>{

    return(
        <div className='usermanage'>
        <Switch>
          {/* <Route exact path={'/addspotimage'}>
          <AddSpotImage/>
          </Route> */}
          <Route exact path={'/createreview'}>
          <CreateSpotReview/>
          </Route>
          <Route exact path={'/hosting/reviews'}>
          <ReviewManage/>
          </Route>
          <Route exact path={'/hosting'}>
          <ListManage/>
          </Route>
          <Route exact path={'/createlisting'}>
          <CreateSpot/>
          </Route>
          <Route exact path={'/editlisting/:spotId'}>
          <EditSpot/>
          </Route>
        </Switch>
        </div>    
    )
}

export default ManageCenter;