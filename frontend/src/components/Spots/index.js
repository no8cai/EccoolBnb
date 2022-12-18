import { Route, Switch } from 'react-router-dom';
import SpotList from './SpotList';
import SingleSpot from './SingleSpot';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spot';
import SpotForm from './SpotForm';
// import { useParams } from 'react-router-dom';
// import Reviews from '../Reviews';

const Spots =()=>{    

    const dispatch = useDispatch();
    
    const spotsObj = useSelector(state=>state.spot.allspots);
    const spotreviewsObj = useSelector(state=>state.review.spot);
    //spotreviewsObj.length
  
    useEffect(() => {
      dispatch(fetchSpots());
    }, [dispatch,spotsObj.length,spotreviewsObj.length]);


 return(
    <>
    {/* <SpotList/> */}
 
     <Switch>
     <Route exact path="/">
     <SpotList spotsObj={spotsObj}/>
     </Route>
     {/* <Route path="/spots/:spotId/reviews">
     <Reviews/>
     </Route> */}

     <Route path="/spots/:spotId">
     <SingleSpot/>
     </Route>

       {/* <Route path="/spots/new" component={CreateBookForm} /> */}
       {/* <Route path="/spots/:spotId" component={SingleSpot} /> */}
      {/* <Route path="/spots/:spotId/edit" component={EditBookForm} /> */}


     </Switch>
     {/* <SingleSpot/> */}
    </>
 )

}

export default Spots;