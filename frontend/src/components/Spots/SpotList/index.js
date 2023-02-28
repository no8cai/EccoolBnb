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
  
  function formatPriceWithCommas(price) {
    const priceStr = price.toString();
    let [wholeNum, decimal] = priceStr.split('.');
    if (!decimal) {
      decimal = '00';
    } else if (decimal.length === 1) {
      decimal += '0';
    }

    let numstr=wholeNum.toString().split("").reverse()
    let newstr=[]
    for(let i=0;i<numstr.length;i++){
       newstr.push(numstr[i])
       if((i+1)%3==0&&i!==numstr.length-1){
         newstr.push(",")
       }
    }
    let newresult= newstr.reverse().join("")
    return newresult + '.' + decimal;
  }
  
  if(!spotsObj) return null

    return (
      <>
      <div className='Landing-sec'>
        <div className='listitem'>
          {spots.map(({ id, city,state,country,price,avgRating,previewImage }) => (
            <div className='item' key={id}><NavLink to={`/spots/${id}`}>
                <div className='itemimg'>
                <img src={previewImage} className="image"
                 onError={e => { e.currentTarget.src = "http://app-bucket-eric001.s3.amazonaws.com/9092828bb3cf4575bfa7682d8e4ba73a.jpg"; }}
                  />
                  </div>
                <div className='address'>
                   <div>{`${city}, ${state}, ${country}`}</div>
                   <div><i className="fas fa-star" />{avragedete(avgRating)}</div>
                </div>
                <div className='price'>
                   {`$${formatPriceWithCommas(parseFloat(price).toFixed(2))} night`}
                </div>
            </NavLink></div>
          ))}
          <i></i><i></i><i></i><i></i><i></i>
        </div>
        
      </div>
      <LandingFooter/>
      </>
    );
  };
  
  export default SpotList;