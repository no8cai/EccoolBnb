import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Switch, NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "../Users.css"
import { restoreUser } from "../../../store/session";
import { fetchSpotBookings } from "../../../store/booking";
import { useParams } from "react-router-dom";
import { fetchOneSpot } from "../../../store/spot";
import { fetchDeleteBooking } from "../../../store/booking";

const OrderManage=()=>{
   
    const {spotId}=useParams();
    const dispatch = useDispatch();
    const bookingsObj = useSelector(state=>state.booking.spotbookings);
    const currentUser = useSelector(state=>state.session.user);
    const singleSpot = useSelector(state=>state.spot.singlespot);
    const bookings = Object.values(bookingsObj).filter(el=>el.spotId==spotId);
    const todayDate = new Date()
    const todayDateStr = todayDate.toJSON().slice(0,10)

    useEffect(() => {
        dispatch(restoreUser())
        dispatch(fetchSpotBookings(spotId));
        dispatch(fetchOneSpot(spotId))
  }, [dispatch]); 

  const deleteEvents= (id)=>{
    dispatch(fetchDeleteBooking(id))
 }

 const avragedete =(input)=>input==="NaN"?"":input;

  if((!currentUser)||(!bookingsObj)||(!singleSpot.SpotImages)) return null



    return (
        <div className="lm-section">
        <h1>Welcome to order manager</h1>
        <div className='bm-managebox'>
            <div>
              <NavLink to={`/spots/${singleSpot.id}`} className="links">
              <img src={singleSpot.SpotImages[0].url} className="om-image"/>
              </NavLink>
            </div>
            <div className="om-rightsec">
              <div className="om-righttop">
              <div className="om-addresstitle">{singleSpot.name}</div>
              <div>{singleSpot.address}</div>
              <div className="bm-city">{`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}</div>
              </div>
              <div className="om-rightbottom">
                <div><div><i className="fas fa-star" />{avragedete(singleSpot.avgRating)}<span>{` ${singleSpot.numReviews} reviews`}</span></div></div>
                <div className="om-description">{singleSpot.description}</div>
              </div>
            </div>
        </div>
        <div className="om-managelistsec">
            <div className="om-ordertitle">Order details</div>
            <div className="projectlist-titles">
                <div className="projectlist-titletext">First Name</div>
                <div className="projectlist-titletext">Last Name</div>
                <div className="projectlist-titletext">Order Created</div>
                <div className="projectlist-titletext">Order Updated</div>
                <div className="projectlist-titletext">Check-in Date</div>
                <div className="projectlist-titletext">Check-out Date</div>
                <div className="projectlist-titletext">More</div>
            </div>
             <div className="om-orderlistsec">
             {bookings.slice(0).reverse().map(({ id, startDate, endDate,User,createdAt,updatedAt}) => (
             <div div key={id} className='om-managebox'>
              <div className="productlist-item">{User.firstName}</div>
              <div className="productlist-item">{User.lastName}</div>
              <div className="productlist-item">{createdAt.slice(0,10)}</div>
              <div className="productlist-item">{updatedAt.slice(0,10)}</div>
              <div className="productlist-item">{startDate}</div>
              <div className="productlist-item">{endDate}</div>
              <div className="productlist-item">
              {(Date.parse(todayDateStr)<Date.parse(startDate))&&(<div className='addreview om-button' onClick={()=>{deleteEvents(id)}}>Cancel</div>)}
              {(Date.parse(todayDateStr)>=Date.parse(startDate))&&(<div>Order Completed</div>)}
              </div>
             </div>
             ))}
             </div>
        </div>
        </div>
    )

}

export default OrderManage