import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Route, Switch, NavLink,useHistory } from 'react-router-dom';
import { fetchUserReivews,fetchCreateReview,fetchEditReview,fetchDeleteReview } from "../../../store/review";
import OpenModalButton from "../../OpenModalButton";
import { useState } from "react";
import EditReview from "../../Reviews/EditReview";

const ReviewManage=()=>{


    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);
    const reviewsObj = useSelector(state=>state.review.user);
    const reviews = Object.values(reviewsObj);
    const history=useHistory();  
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(fetchUserReivews());
  }, [dispatch]); 

    const deleteEvents= (id)=>{
    dispatch(fetchDeleteReview(id))
    }
    
    if((!currentUser)||(!reviewsObj)) return null

    return(
            <div className="lm-section">
            <h1 className="revbar">Welcome to Management Center</h1>
            <h3>Your Reviews</h3>
            <div className="managelist">
            {reviews.slice(0).reverse().map(({ id, stars, review,spotId,Spot}) => (
                <div key={id} className='managebox'> 
                <div className="managereinfo">
                    <div className="managerev">
                    <NavLink to={`/spots/${spotId}`} className="links">
                    <h4>{`${Spot.address}`}</h4>
                    </NavLink>
                    <div><i className="fas fa-star" />{stars}</div>
                    </div>
                    <div>{review}</div> 
                </div>
                <div className="button-section">
                    <div>
                         <OpenModalButton
                          buttonStyle={'buttons'}
                          buttonText={<div><i className="fa-regular fa-pen-to-square" />edit</div>} 
                          onItemClick={closeMenu}
                          modalComponent={<EditReview id={id} />}
                          />
                    </div>
                    <button className="buttons" onClick={()=>deleteEvents(id)}><i className="fa-solid fa-trash-can" />Delete</button>
                </div>
                </div>
              ))}
            </div>
            </div>    
        )
    }
    
export default ReviewManage;