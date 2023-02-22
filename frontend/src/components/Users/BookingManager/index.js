import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState} from "react";
import { Route, Switch, NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "../Users.css"
import { restoreUser } from "../../../store/session";
import { fetchUserBookings } from "../../../store/booking";
import { fetchDeleteBooking } from "../../../store/booking";
import OpenModalButton from '../../OpenModalButton';
import BookingForm from "../../Bookings/EditBooking";


const BookingManage=()=>{
   
    const dispatch = useDispatch();
    const bookingsObj = useSelector(state=>state.booking.userbookings);
    // const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});
    const currentUser = useSelector(state=>state.session.user);
    const bookings = Object.values(bookingsObj);
    const history=useHistory();  
    const todayDate = new Date()
    const todayDateStr = todayDate.toJSON().slice(0,10)
    

  
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(restoreUser())
        dispatch(fetchUserBookings());
  }, [dispatch]); 



const deleteEvents= (id)=>{
   dispatch(fetchDeleteBooking(id))
}

    const dayscalculation=(start,end)=>{
        let sectime=(Date.parse(end)-Date.parse(start))/1000
        return Math.floor(sectime/86400)
    }


    if((!currentUser)||(!bookingsObj)) return null

    return (
        <div className="lm-section">
        <h1 className="revbar">{`Welcome back ${currentUser.firstName}, you have ${bookings.length} coming trip${bookings.length>1?"s":""} with us`}</h1>
        <h3>Upcoming Trips</h3>
        <div className="bm-managelist">
        {bookings.slice(0).reverse().map(({ id, startDate, endDate,Spot}) => (
            <div key={id} className='bm-managebox'>
            <div className="bm-leftsec">
            <div className="bm-lefttopsec">
                <div className="bm-address">{Spot.address}</div>
                <div className="bm-city">{`${Spot.city}, ${Spot.state}, ${Spot.country}`}
                </div>
            </div>    
            <div className="bm-managereinfo">
                <div className="bm-managerev">
                <div>{`Check-In: ${startDate}`}</div>
                <div>{`Check-Out: ${endDate}`}</div>
                <div>{`Number of days to stay: ${dayscalculation(startDate,endDate)} days`}</div>
                <div>{`Base price: $${(dayscalculation(startDate,endDate)*Spot.price).toFixed(2)}`}</div>
                <div>{`Clean price: $${(dayscalculation(startDate,endDate)*Spot.price*0.07).toFixed(2)}`}</div>
                <div>{`Service price: $${(dayscalculation(startDate,endDate)*Spot.price*0.15).toFixed(2)}`}</div>
                <div>{`Total price: $${(dayscalculation(startDate,endDate)*Spot.price*1.22).toFixed(2)}`}</div>
                </div>
                <div className="bm-buttonsec">
                    <div className="bm-buttonitem">
                    {(Date.parse(todayDateStr)>=Date.parse(startDate))&&(<button id="do-not-interact" className='bm-notclick addreview' disabled={true} title="Past booking can not be changed">Update</button>)}
                    {(Date.parse(todayDateStr)<Date.parse(startDate))&&(
                    <OpenModalButton
                               buttonDisable={true}
                               buttonStyle={'bm-no addreview'}
                               buttonText={`Update`} 
                               onItemClick={closeMenu}
                               modalComponent={<BookingForm id={id} start={startDate} end={endDate}/>}
                             />)}
                    </div>
                    <div className="bm-buttonitem">
                    {(Date.parse(todayDateStr)>=Date.parse(startDate))&&(<div id="do-not-interact" className='bm-notclick addreview' disabled={true} title="Past booking can not be canceled">Cancel</div>)}
                    {(Date.parse(todayDateStr)<Date.parse(startDate))&&(<div className='addreview bm-button' onClick={()=>{deleteEvents(id)}}>Cancel</div>)}
                    </div>
                </div>
                
            </div>
            </div>
            <div>
                <NavLink to={`/spots/${Spot.id}`} className="links">
                <img className="bm-image" src={Spot.previewImage}/>
                </NavLink>
            </div>
            </div>
          ))}
        </div>
        </div>   
    )

}

export default BookingManage