import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Switch, NavLink } from 'react-router-dom';
import { fetchUserSpots } from "../../../store/spot";
import { useHistory } from "react-router-dom";
import { fetchDeleteSpot } from "../../../store/spot";
import "../Users.css"
import { restoreUser } from "../../../store/session";
import { deleteReview } from "../../../store/review";

const ListManage=()=>{
    
    const dispatch = useDispatch();
    const spotreviewsObj = useSelector(state=>state.review.spot);
    // const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+spotId});
    const currentUser = useSelector(state=>state.session.user);
    const spotsObj = useSelector(state=>state.spot.userspots);
    const spots = Object.values(spotsObj);
    const history=useHistory();  

    useEffect(() => {
          dispatch(restoreUser())
          dispatch(fetchUserSpots());
    }, [dispatch]); 
    

    const createEvents=()=>{
         history.push('/createlisting')
    }

    const editEvents=(id)=>{
        history.push(`/editlisting/${id}`)
    }

    const orderEvents=(id)=>{
        history.push(`/hosting/orders/${id}`)
    }


    const deleteEvents= (id)=>{
        const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+id});
        if(spotreviews.length>0){
            spotreviews.forEach((el)=>{
              dispatch(deleteReview(el.id))
            })
        }
        dispatch(fetchDeleteSpot(id))
    }

    const avragedete =(input)=>input==="NaN"?"":input;

    if(!currentUser) return null


    return(
            <div className="lm-section">
            <div className="topbar">
            <h1>Welcome to Management Center</h1>
            <button onClick={()=>createEvents()} className='listbutton'>List your home</button>
            </div>
            <h3>Your listings</h3>
            <div className="managelist">
            {spots.map(({ id, name,address,city,state,country,price,avgRating,previewImage }) => (
                <div key={id} className='managebox'>
                <div className='boxitems'>
                    <NavLink to={`/spots/${id}`} className="links">
                    <h3>{name}</h3>
                    <div>{address}</div>
                    <div className='manageaddress'>
                       <div>{`${city},${state},${country}`}</div>
                       <div><i className="fas fa-star" />{avragedete(avgRating)}</div>
                    </div>
                    <div>
                       {`$${parseFloat(price).toFixed(2)} night`}
                    </div>
                    </NavLink>
                </div>
                <div className="button-section">
                    <button onClick={()=>editEvents(id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
                    <button onClick={()=>deleteEvents(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
                    <button onClick={()=>orderEvents(id)} className='buttons'><i className="fa-solid fa-list" />Spot Order list</button>
                </div>
                </div>
              ))}
            </div>
            </div>    
        )
    }
    
    export default ListManage;