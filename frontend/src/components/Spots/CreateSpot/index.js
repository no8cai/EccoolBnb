import SpotForm from "../SpotForm";

const CreateSpot=()=>{
    const randomLat=(Math.random()*(90-(-90)) - 90).toFixed(7);
    const randomLng=(Math.random()*(180-(-180)) - 180).toFixed(7);
    
    const spot ={
        name:'',
        address:'',
        city:'',
        state:'',
        country:'',
        lat:randomLat,
        lng:randomLng,
        price:0,
        description:''
    }

    return(
        <SpotForm spot={spot} formType='Create Spot'/>
    )
}

export default CreateSpot;