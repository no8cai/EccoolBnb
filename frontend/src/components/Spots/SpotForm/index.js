import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateSpot,fetchEditSpot,fetchAddImage } from '../../../store/spot';
import './SpotForm.css'


const SpotForm=({spot,formType})=>{
    
    let initName,initAddress,initCity,initState,initCountry,initPrice,initDescription;
    const history=useHistory()
    const dispatch = useDispatch();

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
    const [preview, setPreview] = useState("true");

    const [validationErrors, setValidationErrors] = useState([]);
    

    
    useEffect(() => {
      if (!name&&!address&&!city&&!state&&!country&&!description&&!url) {
        setValidationErrors([]);
        return;
      }

      const errors =[];
      if(name.length<=0){errors.push("Listing's name field is required");}
      else if(name.length>=50){errors.push("Listing's name must be less than 50 characters")}
      if(address.length<=0){errors.push("Listing's address field is required");}
      if(city.length<=0){errors.push("Listing's city field is required");}
      if(state.length<=0){errors.push("Listing's state field is required");}
      if(country.length<=0){errors.push("Listing's country field is required");}
      if(isNaN(price)){errors.push("Listing's price must be a number");}
      else if(price<=0){errors.push("Listing's price must be greater than 0");}
      if(description.length<=0){errors.push("Listing's description field is required");}
      
      if(formType==="Create Spot"){
      if(url.length<=0){errors.push("Listing's image link field is required");}
      else if (!url.includes("http")){errors.push("Listing's image link must be a valid website link");}
      }

      setValidationErrors(errors);

    }, [name,address,city,state,country,description,url,price,preview]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return alert(`Cannot Submit`);

        const tempSpot = { ...spot, name, address,city,state,country,price,description };
        const tempImage={url,preview};
        const errors=[]

        if(formType==="Create Spot"){
          dispatch(fetchCreateSpot(tempSpot,tempImage))
          .then(()=>{history.push(`/`)})
          .catch(async (err)=>{
            const errobj=await err.json();
            errors.push(errobj.message)
            setValidationErrors(errors)
          
          });
          }
        else if(formType==="Edit Spot"){
          dispatch(fetchEditSpot(tempSpot))
          .then(history.push(`/`))
          .catch(async (err)=>{
            const errobj=await err.json();
            errors.push(errobj.message)
            setValidationErrors(errors)
            
          });
        }  
        // setValidationErrors([]) 
      };

    return(
      <div className='spotform-section'>
        <div className='spotform-leftsec'>
        <div className='spotform-title'><h2>{formType}</h2></div>
        <form className='spotform-form' onSubmit={handleSubmit}>
          <div className='spotform-neweditspot'>

          <div className='spotform-listitem'>
          <label>
          Choose your listing's favorite name
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}/></div>
         
         <div className='spotform-listitem'>
         <label>
          Input your listing's address
          </label>
          <input
          className='input'
          placeholder='Please add the address'
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}/></div>
         
         <div className='spotform-listitem'>
         <label>Input your listing's city</label>
          <input
          className='input'
          placeholder='Please add the city'
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}/></div>
         
         <div className='spotform-listitem'>
         <label>
         Input your listing's state
          </label>
          <input
          className='input'
          placeholder='Please add the state'
          type="text"
          name="state"
          onChange={(e) => setState(e.target.value)}
          value={state}/></div>
         
         <div className='spotform-listitem'>
         <label>
         Input your listing's country</label>
          <input
          className='input'
          placeholder='Please add the country'
          type="text"
          name="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}/></div>
         
         <div className='spotform-listitem'>
         <label>
         Input your listing's address price</label>
          <input
          className='input'
          placeholder='Please add a price greater than 0'
          type="flot"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}/></div>
         
         <div>
         <label>
         Input your listing's description</label>
          <textarea
          className='input'
          placeholder='Please add description for your listing'
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}/></div>
         </div>

         {formType==="Create Spot" && (
          <div className='spotform-neweditspot'>
      
          <div className='spotform-listitem'>
          <label>
          Input your listing's image link</label>
          <textarea
          disabled={formType==="Edit Spot"}
          className='input'
          placeholder='Please add a valid image link for your listing'
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}/></div>

          <label>Choose your listing image privacy</label>
          <label>
          <input
          type="radio"
          value={true}
          onChange={(e) => setPreview(e.target.value)}
          name="preview"
          checked={preview === "true"}
          />
          I Agree to Share my Image to Public
          </label>
          <label>
          <input
          type="radio"
          onChange={(e) => setPreview(e.target.value)}
          value={false}
          name="preview"
          checked={preview === "false"}
          />
          I Do Not Want to Share My Image to Public
          </label>
          </div>
          )}
          
         <input type="submit" value={formType} className="spotbutton" disabled={!!validationErrors.length}/>
         </form>
         </div>

         <div className='spotform-errorsec'>
         <div className='error-title'>
         <i className="fa-solid fa-circle-exclamation ertlbu" />
         <h4>Validation Checking List</h4>
         </div>
          {!!validationErrors.length && (
          <div className='spotform-errortable'>
          <div className='spotform-error'>
          {validationErrors.map((error) => (
          <div key={error} className="spotform-errortext">{error}</div>
                       ))}
          </div>
          </div>
          )}
          </div>
    </div>
    )
}

export default SpotForm;