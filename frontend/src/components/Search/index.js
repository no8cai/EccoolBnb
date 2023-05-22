import { NavLink } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchSpots } from "../../store/spot"
import LandingFooter from "../Footer/LandingFooter"
import { useParams } from "react-router-dom"

const Searchpage=()=>{

    const dispatch = useDispatch();
    const {searchItem}=useParams()
    const spotsObj = useSelector(state=>state.spot.allspots);
    const spots = Object.values(spotsObj).filter(el=>{
        if(el.name.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.address.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.city.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.state.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        }
        if(el.country.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.description.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        return false});
  
  
    useEffect(() => {
      dispatch(fetchSpots());
    }, [dispatch]);
  
    
    const avragedete =(input)=>input==="NaN"?"":input;
    
    if(!spotsObj) return null
    if(spots.length==0) return (
        <>
        <div className='Landing-sec'>
          <div className='listitem'>
           <h2>There is no matching property</h2>
          </div>
          
        </div>
        <LandingFooter/>
        </>
    )



      return (
        <>
        <div className='Landing-sec serc'>
          <div className='listitem'>
            {spots.map(({ id, city,country,price,avgRating,previewImage }) => (
              <div className='item' key={id}><NavLink to={`/spots/${id}`}>
                  <div className='itemimg'>
                  <img src={previewImage} className="image"
                   onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
                    />
                    </div>
                  <div className='address'>
                     <div>{`${city},${country}`}</div>
                     <div><i className="fas fa-star" />{avragedete(avgRating)}</div>
                  </div>
                  <div className='price'>
                     {`$${parseFloat(price).toFixed(2)} night`}
                  </div>
              </NavLink></div>
            ))}
            <i></i><i></i><i></i><i></i><i></i>
          </div>  
        </div>
        <LandingFooter/>
        </>
      )
}

export default Searchpage