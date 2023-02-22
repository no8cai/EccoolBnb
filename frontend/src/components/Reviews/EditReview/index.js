import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserReivews } from "../../../store/review";

const EditReview=({id})=>{
//    const {reviewId}=useParams();
   const review = useSelector(state=>state.review.user[id])
   const reviewsObj = useSelector(state=>state.review.user);
   const dispatch = useDispatch();


   useEffect(() => {
    dispatch(fetchUserReivews());
}, [dispatch]); 

   const theReview={
     id:review.id,
     review:review.review,
     stars:review.stars,
   }

   if(!reviewsObj) return null
   
return(
    <ReviewForm theReview={theReview} formType='Edit Review'/>
)

}

export default EditReview;