import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Route, Switch, NavLink,useHistory } from 'react-router-dom';
import { fetchUserReivews,fetchCreateReview,fetchEditReview,fetchDeleteReview } from "../../../store/review";

const ReviewManage=()=>{


    const dispatch = useDispatch();
    // const currentUser = useSelector(state=>state.session.user);
    const reviewsObj = useSelector(state=>state.review.user);
    const reviews = Object.values(reviewsObj);
    const history=useHistory();  

    useEffect(() => {
        dispatch(fetchUserReivews());
  }, [dispatch]); 

//    const editEvents=(id)=>{
//     history.push(`/editlisting/${id}`)
//    }

    const deleteEvents= (id)=>{
    dispatch(fetchDeleteReview(id))
    }
    
    return(
            <>
            <h3>User management</h3>
            {/* <h3>{`Welcome ${currentUser.firstName}`}</h3> */}
            <h4>Your Reviews</h4>
            <div className="list">
            {reviews.map(({ id, starts, review,spotId,ReviewImages}) => (
                <div key={id}>
                <div><NavLink to={`/reviews/${id}`}>
                    {/* <div>{ReviewImages[0]}</div> */}
                    <div>{spotId}</div>
                    <div><i className="fas fa-star" />{starts}</div>
                    <div>{review}</div> 
                </NavLink></div>
                <div>
                    <button>Edit</button>
                    <button onClick={()=>deleteEvents(id)}>Delete</button>
                </div>
                </div>
              ))}
            </div>
            </>    
        )
    }
    
export default ReviewManage;