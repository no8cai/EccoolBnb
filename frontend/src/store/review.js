import { csrfFetch } from "./csrf";

// review types
const GET_SPOTREVIEWS = 'reviews/getSpotReviews';
const GET_USERREVIES = 'reviews/getUserReviews';
const DELETE_USERREVIES = 'reviews/deleteUserReviews';
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

export const deleteUserReviews = () => {
    return {
      type: DELETE_USERREVIES,
    };
  };


export const createSpotReview = (review) => {
    return {
      type: CREAT_SPOTREVIEW,
      review
    };
  };

export const editReview = (review) => {
    return {
      type: EDIT_REVIEW,
      review
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
    dispatch(userReviews(reviews));
    }
};

// export const fetchDeleteUserReivews = () => async (dispatch) => {
//   dispatch(deleteUserReviews());
// };

export const fetchCreateReview = (spotId,review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (response.ok) {
      const created = await response.json();
      dispatch(createSpotReview(created));
    }
  };

export const fetchEditReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (response.ok) {
      const created = await response.json();
      dispatch(editReview(created));
    }
  };

export const fetchDeleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`,{
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteReview(id));
      }
         
};


// reveiw reducer
const initialState = {user:{},spot:{}};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_SPOTREVIEWS: 
        newState = {...state,spot:{...state.spot}}
        action.Reviews.forEach(review => {
        newState.spot[review.id] = review
        })
        return newState;
      case GET_USERREVIES:
        newState = {...state,user:{...state.user}}
        action.Reviews.forEach(review => {
        newState.user[review.id] = review
        })
        return newState;
      case DELETE_USERREVIES:
        newState = {...state,user:{...state.user}}
        newState.user={}
        return newState;
      case CREAT_SPOTREVIEW:
        newState = {...state,spot:{...state.spot}}
        newState.spot[action.review.id]=action.review
        return newState
      case EDIT_REVIEW:
        newState = {...state,spot:{...state.spot},user:{...state.user}}
        newState.spot[action.review.id]={...newState.spot[action.review.id],...action.review}
        newState.user[action.review.id]={...newState.spot[action.review.id],...action.review}
        return newState
      case DELETE_REVIEW:
        newState = {...state,spot:{...state.spot},user:{...state.user}}
        delete newState.spot[action.id]
        delete newState.user[action.id]
        return newState
      default:
        return state;
    }
  };  


  export default reviewReducer;