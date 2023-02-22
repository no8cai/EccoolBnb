import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneSpot } from '../../../store/spot';
import { useParams } from 'react-router-dom';
import './SingleSpot.css';
import Reviews from '../../Reviews';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import { fetchSpotReivews } from '../../../store/review';
import { useHistory } from 'react-router-dom';
import CreateSpotReview from '../../Reviews/CreateSpotReview';
import OpenModalButton from '../../OpenModalButton';
import { useModal } from '../../../context/Modal';
import Footer from '../../Footer';
import { fetchCreateBooking } from '../../../store/booking';
import LoginFormModal from '../../LoginFormModal';

const SingleSpot = () => {

    const { spotId } = useParams();
    const singleSpot = useSelector(state=>state.spot.singlespot);
    const spotreviewsObj = useSelector(state=>state.review.spot);
    const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});
    const currentUser = useSelector(state=>state.session.user);
    const todayDate = new Date()
    const todayDateStr = todayDate.toJSON().slice(0,10)

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);


    const {closeModal } = useModal();
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const history=useHistory(); 
    

    useEffect(() => {
      dispatch(fetchOneSpot(spotId))
      dispatch(fetchSpotReivews(spotId))

    }, [spotreviewsObj.length]);
    
  const dayscalculation=(start,end)=>{
      let sectime=(Date.parse(end)-Date.parse(start))/1000
      return Math.floor(sectime/86400)
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const tempbooking={
        startDate:startDate,
        endDate:endDate
      }
      const errors=[]

      if(Date.parse(startDate)<=Date.parse(todayDateStr)){
        errors.push("start date can not be past or current date")
        setValidationErrors(errors)
        return
      }
      else if(dayscalculation(startDate,endDate)<1 && dayscalculation(startDate,endDate)>=0){
        errors.push("start date and end date can not be the same day")
        setValidationErrors(errors)
        return
      }

      dispatch(fetchCreateBooking(spotId,tempbooking))
        .then(()=>{history.push(`/hosting/booking`)})
        .catch(async (err)=>{
            const errobj=await err.json()
            errors.push(errobj.message)
            setValidationErrors(errors)
          });
    
    };


    const closeMenu = () => setShowMenu(false);
    const avragedete =(input)=>input==="NaN"?"":input;
    const loginEvents=()=>{
      history.push(`/`)
      }


    if(!singleSpot.SpotImages) return null
  
    const buttonClassName = "addreview ss-addreview" + ((currentUser!==null) ? "" : " hide");
    
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
           {/* {singleSpot.SpotImages.slice(0).reverse().slice(0,5).map(({id,url},index)=>(
              // <img key={id} className={`siglespot-image image${index}`} src={url}/>
              <img key={id} className={`siglespot-image image${index}`} src={url}
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />
             ))} */}
              <img className={`siglespot-image image0`} src={singleSpot.SpotImages[4]?singleSpot.SpotImages[4].url:"http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"}
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />
              <img className={`siglespot-image image1`} src={singleSpot.SpotImages[3]?singleSpot.SpotImages[3].url:"http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg" }
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />
              <img className={`siglespot-image image2`} src={singleSpot.SpotImages[2]?singleSpot.SpotImages[2].url:"http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg" }
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />
              <img className={`siglespot-image image3`} src={singleSpot.SpotImages[1]?singleSpot.SpotImages[1].url:"http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"}
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />
              <img className={`siglespot-image image4`} src={singleSpot.SpotImages[0]?singleSpot.SpotImages[0].url:"http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"}
              onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
               />                         
        </div>
        <div className='infosection'>
        <div className='info-left'>
        <div className='info-title'><h2>{`${singleSpot.name} hosted by ${singleSpot.Owner.firstName}`}</h2></div>
        <div className='infoitem'><i className="fa-solid fa-medal" /><h3>{`${singleSpot.Owner.firstName} is a Superhost`}</h3></div>
        <div className='infotext'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
        <div className='infoitem'><i className="fa-solid fa-door-open"/><h3>Self check-in</h3></div>
        <div className='infotext'>Check yourself in with the keypad.</div>
        <div className='infoitem'><i className="fa-solid fa-location-dot"/><h3>Great location</h3></div>
        <div className='infotext'>Most guests gave the location a 5-star rating.</div>
        <div className='ss-aircoversec'>
          <div><span className='ss-air'>air</span><span className='ss-cover'>cover</span></div>
          <div className='ss-aircovercontext'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issus like touble checking in.</div>
        </div>
        </div>
        <div className='info-right'>
          <div className='right-top'>
          <div className='right-left'><h3>{`$${parseFloat(singleSpot.price).toFixed(2)}`}</h3><div>night</div></div> 
          <div className='right-right'><i className="fas fa-star" /><div>{avragedete(singleSpot.avgRating)}</div>
          <span className='ss-midpot'>{"·"}</span>
          <span>
          <OpenModalMenuItem
               itemText={`${singleSpot.numReviews} reviews`} 
               onItemClick={closeMenu}
               modalComponent={<Reviews spotreviews={spotreviews}/>}
               itemStyle="reviewlink"
             />
        </span> 
          </div>
          
         </div>
         <div>

         </div>
         <div>
          <form className='ss-bookingsec' onSubmit={handleSubmit}>
             <div className='ss-bookingdate'>
             <div className='ss-dateitem'>
             <label htmlFor='start' className='ss-datelabel'>
             CHECK-IN
             </label>
             <input
              id='start'
              className='ss-input'
              placeholder='type your startDate'
              type="date"
              name="startDate"
              min={todayDateStr}
              onChange={(e) => setStartDate(e.target.value)}
              required={true}
              value={startDate}/></div>
             
             <div div className='ss-dateitem'>
             <label className='ss-datelabel'>
             CHECKOUT
             </label>
             <input
              className='ss-input'
              placeholder='type your end date'
              type="date"
              name="endDate"
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              required={true}
              value={endDate}/></div>        
             </div>
          { !!currentUser && (<button className='addreview ss-submit' type="submit">Reserve</button>)}
          { !currentUser && (
            <OpenModalMenuItem
              itemStyle={"addreview ss-submit"}
              itemText="Log-In to Reserve"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />)}
          </form>
              <div className='ss-errorsec'>
                      {!!validationErrors.length && (
                      <div className='projectform-errortable'>
                      <div className='projectform-error'>
                       {validationErrors.map((error) => (
                         <div key={error} className='signin-errors'><i className="fa-solid fa-circle-exclamation"/>{error}</div>
                       ))}
                      </div>
                      </div>
                      )}
              </div>
          </div>
          { (Date.parse(startDate)<Date.parse(endDate)) &&(<div className='ss-pricesec'>
                <div className='ss-wontcharge'>You won't be charged yet</div>
                <div className='ss-priceitem'>
                 <div className='ss-priceheader'>{`$${singleSpot.price}x${dayscalculation(startDate,endDate)} night${dayscalculation(startDate,endDate)>1?"s":""}`}</div>
                 <div>{`$${(dayscalculation(startDate,endDate)*singleSpot.price).toFixed(2)}`}</div>
                 </div>
                <div className='ss-priceitem'>
                  <div className='ss-priceheader'>Clening fee</div>
                  <div>{`$${(dayscalculation(startDate,endDate)*singleSpot.price*0.07).toFixed(2)}`}</div>
                </div>
                <div className='ss-priceitem'>
                  <div className='ss-priceheader'>Service fee</div>
                  <div>{`$${(dayscalculation(startDate,endDate)*singleSpot.price*0.15).toFixed(2)}`}</div>
                  </div>
                <div className='ss-priceitem ss-totalsec'>
                  <div className='ss-totalprice'>Total price</div>
                  <div className='ss-totalprice'>{`$${(dayscalculation(startDate,endDate)*singleSpot.price*1.22).toFixed(2)}`}</div>
                </div>
               </div>)}
        </div>
        </div>
        <div className='reviewfooter'>
        <div className='reviewbar'>
           <div><i className="fas fa-star" />{avragedete(singleSpot.avgRating)}</div>
           <div>{`· ${singleSpot.numReviews} reviews ·`}</div>
           { !!currentUser && (<div>Leave a review ?</div>)}
           <OpenModalButton
               buttonDisable={true}
               buttonStyle={buttonClassName}
               buttonText={`Yes`} 
               onItemClick={closeMenu}
               modalComponent={<CreateSpotReview spotId={spotId} closeMenu={closeMenu}/>}
             />
        </div>
          <div className="ss-review">
            {spotreviews.slice(0).reverse().slice(0,10).map(({id,User,review,createdAt})=>(
            <div key={id} className="ss-spotreview">
                <div className="userinfo">
                <i className="fa-regular fa-circle-user" />
                <div className="username">
                <h3 className="name">{User.firstName}</h3>
                <div className="review-date">{createdAt.slice(0,10)}</div>
               </div>
               </div>
               <div className="review">{`${review.slice(0,290)}...`}</div>
            </div>
             ))}
          <div>

          </div>

          </div>
          <OpenModalMenuItem
               itemText={`Show all ${spotreviews.length} reviews`} 
               onItemClick={closeMenu}
               modalComponent={<Reviews spotreviews={spotreviews}/>}
               itemStyle="ss-reviewshowall"
             />
        </div>
        <Footer/>  
      </div>

    );
  };
  
  export default SingleSpot;