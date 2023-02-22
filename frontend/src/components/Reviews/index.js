import "./Review.css"
const Reviews =({spotreviews})=>{
  
    if(spotreviews.length==0) return(
        <div div className="rev">
            
            <h3 className="name">There is no review for this propertiy</h3>
            </div>
    )
    return(
        <div className="rev">
            {spotreviews.map(({id,User,review,createdAt})=>(
            <div key={id} className="spotreview">
                <div className="userinfo">
                <i className="fa-regular fa-circle-user" />
                <div className="username">
                <h3 className="name">{User.firstName}</h3>
                <div className="review-date">{createdAt.slice(0,10)}</div>
               </div>
               </div>
               <div className="review">{`${review}`}</div>
            </div>
             ))}
        </div>
    )
}

export default Reviews;