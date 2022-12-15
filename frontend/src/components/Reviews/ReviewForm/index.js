import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateReview, fetchEditReview } from '../../../store/review';
import '../Review.css'

const ReviewForm=({theReview,formType,spotId,closeMenu})=>{

    
    let initReview,initStars;

    if(formType==="Edit Review"){
        initReview=theReview.review;
        initStars=theReview.stars;
    }
    else{
        initReview='';
        initStars=0;
    }
    

    const [review, setReview] = useState(initReview);
    const [stars, setStars] = useState(initStars);


    const [validationErrors, setValidationErrors] = useState([]);

    const history=useHistory()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempReview = { ...theReview, review,stars };
    
        if(formType==="Create Review"){
          dispatch(fetchCreateReview(spotId,tempReview));
          }
        else if(formType==="Edit Review"){
          dispatch(fetchEditReview(tempReview));
        }
   
      };

    return(
        <form className='reviewform' onSubmit={handleSubmit}>
          <h3>{formType}</h3>
          <ul className='errors'></ul>
          <label>
          Review</label>
          <textarea
          placeholder='input your review'
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}/>
         
         <label>
          Stars</label>
          <input
          type="integer"
          name="stars"
          onChange={(e) => setStars(e.target.value)}
          value={stars}/>
         
         <input type="submit" value={formType} className='buttons revi'/>
        </form>
    )
}

export default ReviewForm;