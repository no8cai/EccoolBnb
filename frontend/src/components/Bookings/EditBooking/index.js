import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { fetchEditBooking } from '../../../store/booking';

const BookingForm=({id,start,end})=>{


    const history=useHistory()
    const dispatch = useDispatch();
    const {closeModal } = useModal();
    const todayDate = new Date()
    const todayDateStr = todayDate.toJSON().slice(0,10)

    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);




    const [validationErrors, setValidationErrors] = useState([]);


      useEffect(() => {
      if (!startDate&&!endDate) {
        setValidationErrors([]);
        return;
      }

      const errors =[];
      if(startDate.length<=0){errors.push("Listing's start date is required");}
      if(endDate.length<=0){errors.push("Listing's end date is required");}
      setValidationErrors(errors);

    }, [startDate,endDate]);






    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return;

        const tempbooking={
            id:id,
            startDate:startDate,
            endDate:endDate

          }
        const errors =[];

          dispatch(fetchEditBooking(tempbooking))
          .then(closeModal)
          .catch(async (err)=>{
            const  errobject=await err.json();
            errors.push(errobject.message)
            setValidationErrors(errors)
          });
   
      };

    return(
      <div className='reviewform-section'>
        <h3 className="reviewform-title">Change booking date</h3>
        
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
          CHECK-IN</label>
          <input
              id='start'
              className='ss-input'
              placeholder='type your startDate'
              type="date"
              name="startDate"
              min={todayDateStr}
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}/></div>

         <label className="reviewform-text">
          CHECK-OUT</label>
          <input
              className='ss-input'
              placeholder='type your end date'
              type="date"
              name="endDate"
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}/></div>

         <input type="submit" value='Update Booking' className='buttons revi'/>
        </form>
        </div>
    )
}

export default BookingForm;