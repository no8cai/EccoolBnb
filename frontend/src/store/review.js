import { csrfFetch } from "./csrf";

// review types
const GET_SPOTREVIEWS = 'reviews/getSpotReviews';
const GET_USERREVIES = 'reviews/getUserReviews';
const CREAT_SPOTREVIEW='reviews/createSpotReview'
const EDIT_REVIEW='reviews/editReview'
const DELETE_REVIEW='reviews/deleteReview'

// review actions
export const spotReviews = ({Reviews}) => {
    return {
      type: GET_SPOTREVIEWS,
      Reviews
    };
  };

export const userReviews = ({Reviews}) => {
    return {
      type: GET_USERREVIES,
      Reviews
    };
  };

export const createSpotReview = (Review) => {
    return {
      type: CREAT_SPOTREVIEW,
      Review
    };
  };

export const editReview = (Review) => {
    return {
      type: EDIT_REVIEW,
      Review
    };
  };

export const deleteReview = (id) => {
    return {
      type: DELETE_REVIEW,
      id
    };
  }; 


// review thunk fetch 
export const fetchSpotReivews = (spotId) => async (dispatch) => {
    const response = await csrfFetch( `/api/spots/${spotId}/reviews`);

    if (response.ok) {
    const reviews = await response.json();
    dispatch(spotReviews(reviews));
    }
};

export const fetchUserReivews = () => async (dispatch) => {
    const response = await csrfFetch( `/api/reviews/current`);

    if (response.ok) {
    const reviews = await response.json();
    dispatch(spotReviews(reviews));
    }
};

// export const fetchCreateReview = (spotId,review) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/:spotId/reviews`,{
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(spot)
//     });
//     if (response.ok) {
//       const created = await response.json();
//       dispatch(createSpot(created));
//       return created
//     }
//   };

// reveiw reducer
const initialState = {user:{},spot:{}};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_SPOTREVIEWS: 
        newState = {...state}
        action.Reviews.forEach(review => {
        newState.spot[review.id] = review
        })
        return newState;
      case GET_USERREVIES:
        newState = {...state}
        action.Reviews.forEach(review => {
        newState.user[review.id] = review
        })
        return newState;
      case CREAT_SPOTREVIEW:
        newState = {...state}
        newState.spot[action.spot.id]=action.spot
        return newState
      case EDIT_REVIEW:
        newState = {...state}
        newState.spot[action.spot.id]=action.spot
        return newState
      case DELETE_REVIEW:
        newState = {...state}
        delete newState.spot[action.id]
        return newState
      default:
        return state;
    }
  };  


  export default reviewReducer;