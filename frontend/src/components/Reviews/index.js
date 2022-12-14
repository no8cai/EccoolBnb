import { fetchSpotReivews } from "../../store/review";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";


const Reviews =({spotreviews})=>{

    // const dispatch = useDispatch();

    // const spotreviewsObj = useSelector(state=>state.review.spot[spotId]);
    // const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});

    // useEffect(() => {
    //     dispatch(fetchSpotReivews(spotId))
    // }, [spotId]);
    const tempSpotviews =[...spotreviews];    
    return(
        <div>
            {tempSpotviews.map(({id,User,review,createdAt})=>(
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