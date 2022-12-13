import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateSpot,fetchEditSpot } from '../../../store/spot';
import './SpotForm.css'


const SpotForm=({spot,formType})=>{

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);

    const history=useHistory()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempSpot = { ...spot, name, address,city,state,country,price,description };
    
        if(formType==="Create Spot"){
          dispatch(fetchCreateSpot(tempSpot));
          }
        else if(formType==="Edit Spot"){
          dispatch(fetchEditSpot(tempSpot));
        }
        history.push(`/`);
      };
    console.log(spot.id)

    return(
        <form className='spotform' onSubmit={handleSubmit}>
          <h3>{formType}</h3>
          <ul className='errors'></ul>
          <label>
          name
          <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}/>
         </label>
         <label>
          address
          <input
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}/>
         </label>
         <label>
          city
          <input
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}/>
         </label>
         <label>
          state
          <input
          type="text"
          name="state"
          onChange={(e) => setState(e.target.value)}
          value={state}/>
         </label>
         <label>
          country
          <input
          type="text"
          name="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}/>
         </label>
         <label>
          price
          <input
          type="flot"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}/>
         </label>
         <label>
          description
          <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}/>
         </label>
         <input type="submit" value={formType} />
        </form>
    )
}

export default SpotForm;