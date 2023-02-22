import { NavLink } from 'react-router-dom';
import './SpotList.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpots } from '../../../store/spot';
import LandingFooter from '../../Footer/LandingFooter';

const SpotList = () => {


  const dispatch = useDispatch();
    
  const spotsObj = useSelector(state=>state.spot.allspots);
  const spots = Object.values(spotsObj);


  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  
  const avragedete =(input)=>input==="NaN"?"":input;
  
  if(!spotsObj) return null

    return (
      <>
      <div className='Landing-sec'>
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
        </div>
        
      </div>
      <LandingFooter/>
      </>
    );
  };
  
  export default SpotList;