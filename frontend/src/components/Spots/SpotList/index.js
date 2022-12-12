import { Route, Switch, NavLink } from 'react-router-dom';
import './SpotList.css';
import SingleSpot from '../SingleSpot';

const SpotList = ({spotsObj}) => {

  const spots = Object.values(spotsObj);

    return (
      <div>
        <h3>Spot List</h3>
        <div className='listitem'>
          {spots.map(({ id, city,country,price,avgRating,previewImage }) => (
            <div className='item' key={id}><NavLink to={`/spots/${id}`}>
                <div>{previewImage}</div>
                <div className='address'>
                   <div>{`${city},${country}`}</div>
                   <div><i className="fas fa-star" />{avgRating}</div>
                </div>
                <div>
                   {`$${price} night`}
                </div>
            </NavLink></div>
          ))}
        </div>
  
        <Switch>
          <Route path='/spots/:spotId'>
            <SingleSpot/>
          </Route>
        </Switch>
      </div>
    );
  };
  
  export default SpotList;