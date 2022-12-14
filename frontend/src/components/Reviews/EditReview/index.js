import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";

const EditReview=({id})=>{
//    const {reviewId}=useParams();
   const review = useSelector(state=>state.review.user[id])
   const theReview={
     id:review.id,
     review:review.review,
     stars:review.stars,
   }

   
return(
    <ReviewForm theReview={theReview} formType='Edit Review'/>
)

}

export default EditReview;