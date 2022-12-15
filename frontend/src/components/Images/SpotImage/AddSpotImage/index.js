import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddImage } from '../../../../store/spot';

const AddSpotImage=({spotId})=>{

    const singleSpot = useSelector(state=>state.spot.singlespot);
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState(true);


    const [validationErrors, setValidationErrors] = useState([]);

    const history=useHistory()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempImage={url,preview};
        dispatch(fetchAddImage(spotId,tempImage))
        history.push("/")
      };

    return(
        <form className='reviewform' onSubmit={handleSubmit}>
          <h3>Add Spot Image</h3>
          <ul className='errors'></ul>
          <label>
          review
          <input
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}/>
         </label>
         <label>
          stars
          <input
          type="boolean"
          name="preview"
          onChange={(e) => setPreview(e.target.value)}
          value={preview}/>
         </label>
         <input type="submit" value={'Add a Image'} />
        </form>
    )
}

export default AddSpotImage;