import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";

const EditReview=({spotId})=>{
   const {reviewId}=useParams();
   const theReview = useSelector(state=>state.review.user[reviewId])
   const spot={
     id:theReview.id,
     review:theReview.review,
     stars:theReview.stars,
   }

return(
    <ReviewForm theReview={theReview} formType='Edit Review'/>
)

}

export default EditReview;