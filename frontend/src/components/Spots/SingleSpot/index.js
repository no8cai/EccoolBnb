import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Route, Switch, NavLink } from 'react-router-dom';
import { fetchOneSpot } from '../../../store/spot';

import { useParams } from 'react-router-dom';
import './SingleSpot.css';
import Reviews from '../../Reviews';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import { fetchSpotReivews } from '../../../store/review';
import { useHistory } from 'react-router-dom';
import CreateSpotReview from '../../Reviews/CreateSpotReview';

const SingleSpot = () => {

    const { spotId } = useParams();
    const singleSpot = useSelector(state=>state.spot.singlespot);
    const spotreviewsObj = useSelector(state=>state.review.spot);
    const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});
    


    const [showMenu, setShowMenu] = useState(false);
    // const [isLoading,SetIsloading]=useState(true)

    const dispatch = useDispatch();
    const history=useHistory(); 
    
    useEffect(() => {
    //   SetIsloading(true)
      dispatch(fetchOneSpot(spotId))
      .then(dispatch(fetchSpotReivews(spotId)))
    //   dispatch(fetchSpotReivews(spotId))
    //   .then(SetIsloading(false))
    }, []);
    
    if(!singleSpot.SpotImages) return null
    // if(isLoading) return 'isloading'

    const closeMenu = () => setShowMenu(false);
    
    const createEvents=()=>{
        history.push('/createreview')
    }

    
    return (
      <div className='spotpage'>
        <h3>{singleSpot.name}</h3>
        <div><i className="fas fa-star" />{singleSpot.avgRating}</div>
        {/* <div>
          <OpenModalMenuItem
               itemText={`${singleSpot.numReviews} reviews`} 
               onItemClick={closeMenu}
               modalComponent={<Reviews spotreviews={spotreviews}/>}
             />
        </div> */}
        <div>
            {singleSpot.SpotImages.map(({id,url})=>(
            <div key={id}>{url}</div>
             ))}
        </div>
        <div>{`hosted by ${singleSpot.Owner.firstName}`}</div>
        <div>{`$${singleSpot.price} night`}</div>
        <div>
           <div>
           <div><i className="fas fa-star" />{singleSpot.avgRating}</div>
           <li>{`${singleSpot.numReviews} reviews`}</li>
           </div>
           <Reviews spotreviews={spotreviews}/>

           <OpenModalMenuItem
               itemText={`add Reviews`} 
               onItemClick={closeMenu}
               modalComponent={<CreateSpotReview spotId={spotId} closeMenu={closeMenu}/>}
             />
           {/* <button onClick={()=>{createEvents()}}>add Reviews</button> */}
        </div>  
        {/* <img
          src={singleArticle?.imageUrl}
          alt={singleArticle?.title}
        /> */}
         {/* <Route path={"/spots/:spotId/reviews"}>
         <Reviews/>
        </Route> */}
      </div>

    );
  };
  
  export default SingleSpot;