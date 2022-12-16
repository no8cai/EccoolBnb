import "./Review.css"
const Reviews =({spotreviews})=>{
  
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
               <div className="review">{review}</div>
            </div>
             ))}
        </div>
    )
}

export default Reviews;