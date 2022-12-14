import ReviewForm from "../ReviewForm";

const CreateSpotReview=({spotId,closeMenu})=>{

        const theReview ={
            review:'',
            stars:0,
        }
    
        return(
            <ReviewForm theReview={theReview} formType='Create Review' spotId={spotId} closeMenu={closeMenu}/>
        )

}

export default CreateSpotReview;