import { fetchSpotReivews } from "../../store/review";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Reviews =({spotreviews})=>{
  
    // const { spotId } = useParams();
    // const dispatch = useDispatch();

    // const spotreviewsObj = useSelector(state=>state.review.spot[spotId]);
    // const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});

    // useEffect(() => {
    //     dispatch(fetchSpotReivews(spotId))
    // }, [spotreviews.length]);
    // if(!spotreviews.User) return null

    return(
        <div>
            {spotreviews.map(({id,User,review,createdAt})=>(
            <div key={id}>
               <div>{User.firstName}</div>
               <div>{createdAt.slice(0,10)}</div>
               <div>{review}</div>
            </div>
             ))}
        </div>
    )
}

export default Reviews;