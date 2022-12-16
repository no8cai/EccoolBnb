import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateReview, fetchEditReview } from '../../../store/review';
import '../Review.css'

const ReviewForm=({theReview,formType,spotId,closeMenu})=>{

    
    let initReview,initStars;
    const history=useHistory()
    const dispatch = useDispatch();

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
    const [error,setError]=useState(null)


    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
      if (!review&&!stars) {
        setValidationErrors([]);
        return;
      }

      const errors =[];
      if(review.length<=0){errors.push("Listing's review field is required");}
      if(Number.isNaN(stars)){errors.push("Listing's stars must be a number");}
      else if(stars<=0 ||stars>5){errors.push("Listing's price must be greater than 0 and max is 5");}

      setValidationErrors(errors);

    }, [review,stars]);






    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return alert(`Cannot Submit`);

        const tempReview = { ...theReview, review,stars };
        const errors =[];

        if(formType==="Create Review"){
          dispatch(fetchCreateReview(spotId,tempReview))
          // .then(res=>{
          //   if(!res.ok){
          //     throw Error("could not fetch the data for the resource")
          //   }
          //   return res.json()
          // })
          .catch((err)=>{
            // const data= err.json()
            console.log(err)
            // console.log(data.errors)
            setError(err.statusText)
            errors.push(`The process is not complete, error occurs`)
            setValidationErrors(errors)
            // console.log(error)
          })
          }
        else if(formType==="Edit Review"){
          dispatch(fetchEditReview(tempReview));
        }
   
      };

    return(
      <div className='reviewsection'>
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
        {error&&<div>{error}</div>}
           <div className='reviewform-errorsec'>
                  <div className='reviewform-title'>
                  <i className="fa-solid fa-circle-exclamation ertlbu" />
                  <h4>Validation Checking List</h4>
                  </div>
                  {!!validationErrors.length && (
                  <div className='reviewform-errortop'>
                  <ul className='reviewform-errors'>
                      {validationErrors.map((error) => (
                      <div key={error}>{error}</div>
                       ))}
                  </ul>
                  </div>
                   )}
          </div>


      </div>
    )
}

export default ReviewForm;