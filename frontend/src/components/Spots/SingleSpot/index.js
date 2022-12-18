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
import OpenModalButton from '../../OpenModalButton';

const SingleSpot = () => {

    const { spotId } = useParams();
    const singleSpot = useSelector(state=>state.spot.singlespot);
    const spotreviewsObj = useSelector(state=>state.review.spot);
    const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});
    const currentUser = useSelector(state=>state.session.user);
    


    const [showMenu, setShowMenu] = useState(false);

    // const [isLoading,SetIsloading]=useState(true)
    // if(!currentUser){setShowButton(false)}
    const dispatch = useDispatch();
    const history=useHistory(); 
    

    useEffect(() => {
    //   SetIsloading(true)
      dispatch(fetchOneSpot(spotId))
      .then(dispatch(fetchSpotReivews(spotId)))
    //   dispatch(fetchSpotReivews(spotId))
    //   .then(SetIsloading(false))
    }, [spotreviewsObj.length]);
    
    if(!singleSpot.SpotImages) return null
    // if(isLoading) return 'isloading'

    const closeMenu = () => setShowMenu(false);
    const avragedete =(input)=>input==="NaN"?"":input;
    
    const createEvents=()=>{
        history.push('/createreview')
    }

    const buttonClassName = "addreview" + ((currentUser!==null) ? "" : " hide");
    
    return (
      <div className='spotpage'>
        <h1>{singleSpot.name}</h1>
        <div className='spotinfo'>
        <div><i className="fas fa-star" />{avragedete(singleSpot.avgRating)}</div>
        <div>
          <OpenModalMenuItem
               itemText={`${singleSpot.numReviews} reviews`} 
               onItemClick={closeMenu}
               modalComponent={<Reviews spotreviews={spotreviews}/>}
               itemStyle="reviewlink"
             />
        </div>
        <div>{`${singleSpot.city},${singleSpot.state},${singleSpot.country}`}</div>
        </div>
        <div className='singlespot-imgsection'>
            {singleSpot.SpotImages.slice(0,5).map(({id,url},index)=>(
            // <div key={id} className={`singlespot-images images${index}`}>
              <img key={id} className={`siglespot-image image${index}`} src={url}/>
            // </div>
             ))}
        </div>
        <div className='infosection'>
        <div className='info-left'>
        <div className='info-title'><h2>{`${singleSpot.name} hosted by ${singleSpot.Owner.firstName}`}</h2></div>
        <div className='infoitem'><i className="fa-solid fa-medal" /><h3>{`${singleSpot.Owner.firstName} is a Superhost`}</h3></div>
        <div className='infotext'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
        <div className='infoitem'><i className="fa-solid fa-location-dot"/><h3>Great location</h3></div>
        <div className='infotext'>Most guests gave the location a 5-star rating.</div>
        </div>
        <div className='info-right'>
          <div className='right-top'>
          <div className='right-left'><h3>{`$${parseFloat(singleSpot.price).toFixed(2)}`}</h3><div>night</div></div> 
          <div className='right-right'><i className="fas fa-star" /><div>{singleSpot.avgRating}</div></div>
          
         </div>
         <OpenModalButton
               buttonDisable={true}
               buttonStyle={buttonClassName}
               buttonText={`Add Reviews`} 
               onItemClick={closeMenu}
               modalComponent={<CreateSpotReview spotId={spotId} closeMenu={closeMenu}/>}
             />
        </div>
        </div>
        <div className='reviewfooter'>
        <div className='reviewbar'>
           <div><i className="fas fa-star" />{avragedete(singleSpot.avgRating)}</div>
           <div>{`·${singleSpot.numReviews} reviews`}</div>
        </div>
           <Reviews spotreviews={spotreviews}/>
        </div>  
      </div>

    );
  };
  
  export default SingleSpot;