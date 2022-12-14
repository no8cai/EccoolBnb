import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Switch, NavLink } from 'react-router-dom';
import { fetchUserSpots } from "../../../store/spot";
import { useHistory } from "react-router-dom";
import { fetchDeleteSpot } from "../../../store/spot";


const ListManage=()=>{

    const dispatch = useDispatch();
    // const currentUser = useSelector(state=>state.session.user);
    const spotsObj = useSelector(state=>state.spot.userspots);
    const spots = Object.values(spotsObj);
    const history=useHistory();  

    useEffect(() => {
          dispatch(fetchUserSpots());
    }, [dispatch]); 
    

    const createEvents=()=>{
         history.push('/createlisting')
    }

    const editEvents=(id)=>{
        history.push(`/editlisting/${id}`)
    }

    const deleteEvents= (id)=>{
        dispatch(fetchDeleteSpot(id))
    }


    return(
            <>
            <h3>User management</h3>
            {/* <h3>{`Welcome ${currentUser.firstName}`}</h3> */}
            <h4>Your listing</h4>
            <button onClick={()=>createEvents()}>List your home</button>
            <div className="list">
            {spots.map(({ id, city,country,price,avgRating,previewImage }) => (
                <div key={id}>
                <div className='item'><NavLink to={`/spots/${id}`}>
                    <div>{previewImage}</div>
                    <div className='address'>
                       <div>{`${city},${country}`}</div>
                       <div><i className="fas fa-star" />{avgRating}</div>
                    </div>
                    <div>
                       {`$${price} night`}
                    </div>
                    
                </NavLink></div>
                <div>
                    <button onClick={()=>editEvents(id)}>Edit</button>
                    <button onClick={()=>deleteEvents(id)}>Delete</button>
                </div>
                </div>
              ))}
            </div>
            </>    
        )
    }
    
    export default ListManage;