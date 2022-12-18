import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateReview, fetchEditReview } from '../../../store/review';
import '../Review.css'
import { useModal } from '../../../context/Modal';

const ReviewForm=({theReview,formType,spotId,closeMenu})=>{

    
    let initReview,initStars;
    const history=useHistory()
    const dispatch = useDispatch();
    const {closeModal } = useModal();

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


      useEffect(() => {
      if (!review&&!stars) {
        setValidationErrors([]);
        return;
      }

      const errors =[];
      if(review.length<=0){errors.push("Listing's review field is required");}
      if(isNaN(stars)){errors.push("Listing's stars must be a number");}
      else if(stars<=0 ||stars>5){errors.push("Listing's stars must be greater than 0 and max is 5");}
      else if(stars%1!==0){errors.push("Listing's stars must be a interger");}
      setValidationErrors(errors);

    }, [review,stars]);






    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return;

        const tempReview = { ...theReview, review,stars };
        const errors =[];

        if(formType==="Create Review"){
          dispatch(fetchCreateReview(spotId,tempReview))
          .then(closeModal)
          .catch(async (err)=>{
            const  errobject=await err.json();
            errors.push(errobject.message)
            setValidationErrors(errors)
          });
          }
        else if(formType==="Edit Review"){
          dispatch(fetchEditReview(tempReview))
          .then(closeModal)
          .catch(async (err)=>{
             const  errobject=await err.json();
            errors.push(errobject.message)
            setValidationErrors(errors)
          });
        }
   
      };

    return(
      <div className='reviewform-section'>
        <h3 className="reviewform-title">{formType}</h3>
        
        <form className='reviewform-form' onSubmit={handleSubmit}>

          {!!validationErrors.length && 
        <div className="reviewform-errorload">
        <div className="reviewform-erroricon"><i className="fa-solid fa-circle-exclamation" /></div>
        <div className="reviewform-errorinfo">
        <div className="reviewform-errortile">Input validation</div>
        <div>
          {validationErrors.map((error, idx) => (
            <div key={idx} className="reviewform-errortext">{error}</div>
          ))}
        </div>
        </div>
        </div>
        }
          <div className="reviewform-infomation">
          <div className="reviewform-review">
          <label className="reviewform-text">
          Review</label>
          <textarea
          placeholder='Share your review'
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}/></div>

         <label className="reviewform-text">
          Stars</label>
          <input
          type="integer"
          name="stars"
          onChange={(e) => setStars(e.target.value)}
          value={stars}/>
         </div>

         <input type="submit" value={formType} className='buttons revi'/>
        </form>
        </div>
    )
}

export default ReviewForm;