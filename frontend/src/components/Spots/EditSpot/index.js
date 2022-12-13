import { useParams } from "react-router-dom";
import SpotForm from "../SpotForm";
import { useSelector } from "react-redux";

const EditSpot=()=>{
   const {spotId}=useParams();
   const tempspot = useSelector(state=>state.spot.userspots[spotId])
   const spot={
     id:tempspot.id,
     name:tempspot.name,
     address:tempspot.address,
     city:tempspot.city,
     state:tempspot.state,
     country:tempspot.country,
     lat:tempspot.lat,
     lng:tempspot.lng,
     price:tempspot.price,
     description:tempspot.description
   }

   return(
     <SpotForm spot={spot} formType="Edit Spot"/>
   )

}

export default EditSpot;