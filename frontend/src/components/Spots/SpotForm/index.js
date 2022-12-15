import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateSpot,fetchEditSpot,fetchAddImage } from '../../../store/spot';
import './SpotForm.css'


const SpotForm=({spot,formType})=>{
    
    let initName,initAddress,initCity,initState,initCountry,initPrice,initDescription;

    if(formType==="Edit Spot"){
        initName=spot.name;
        initAddress=spot.address;
        initCity=spot.city;
        initState=spot.state;
        initCountry=spot.country;
        initPrice=spot.price;
        initDescription=spot.description;
    }
    else{
        initName='';
        initAddress='';
        initCity='';
        initState='';
        initCountry='';
        initPrice=0;
        initDescription='';
    }
    


    const [name, setName] = useState(initName);
    const [address, setAddress] = useState(initAddress);
    const [city, setCity] = useState(initCity);
    const [state, setState] = useState(initState);
    const [country, setCountry] = useState(initCountry);
    const [price, setPrice] = useState(initPrice);
    const [description, setDescription] = useState(initDescription);
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState(true);

    const [validationErrors, setValidationErrors] = useState([]);

    const history=useHistory()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempSpot = { ...spot, name, address,city,state,country,price,description };
        const tempImage={url,preview};

        if(formType==="Create Spot"){
          dispatch(fetchCreateSpot(tempSpot,tempImage))       
          }
        else if(formType==="Edit Spot"){
          dispatch(fetchEditSpot(tempSpot));
        }  

        history.push(`/`);
      };

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
         <label>
          imageUrl
          <input
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}/>
         </label>
          <div>
          <label>
          preview
          <input
          type="boolean"
          name="preview"
          onChange={(e) => setPreview(e.target.value)}
          value={preview}/>
          </label>
          </div>
         <input type="submit" value={formType} />
        </form>
    )
}

export default SpotForm;