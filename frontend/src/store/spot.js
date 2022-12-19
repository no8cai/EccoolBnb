import { csrfFetch } from "./csrf";

//spot types
const LOAD_SPOTS = 'spots/loadSpots';
const GET_USERSPOTS = 'spots/getUserSpots'
const DELETE_USERSPOTS='spots/deleteUserSpots'
const GET_SINGLESPOT = 'spots/getSingleSpot';
const CREATE_SPOT='spots/createSpot'
const ADD_IMAGE='spots/addSpotImage'
const EDIT_SPOT='spots/editSpot'
const DELETE_SPOT='spots/deleteSpot'


//spot actions
export const loadSpots = ({Spots}) => {
    return {
      type: LOAD_SPOTS,
      Spots
    };
  };

export const getUserSpots = ({Spots}) => {
    return {
      type: GET_USERSPOTS,
      Spots
    };
  };

export const deleteUserSpots = () => {
    return {
      type: DELETE_USERSPOTS,
    };
  };

export const getSingleSpot = (spot) => {
    return {
      type: GET_SINGLESPOT,
      spot
    };
  };

export const createSpot = (spot) =>{
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const addImage=(spotId,image)=>{
  return {
    type: ADD_IMAGE,
    spotId,
    image
  }
} 

export const editSpot = (spot) =>{
    return {
        type: EDIT_SPOT,
        spot
    }
}

export const deleteSpot = (id) =>{
    return {
        type: DELETE_SPOT,
        id
    }
}

//spot thunk fetch
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    }
};

export const fetchUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
    const spots = await response.json();
    dispatch(getUserSpots(spots));
    }
};

// export const fetchDeleteUserSpots = () => async (dispatch) => {
//   dispatch(deleteUserSpots());
// };

export const fetchOneSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (response.ok) {
    const spot = await response.json();
    dispatch(getSingleSpot(spot));
    }
};

export const fetchCreateSpot = (spot,image) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
    });
    if (response.ok) {
      const created = await response.json();
      dispatch(createSpot(created));
      const imgresponse = await csrfFetch(`/api/spots/${created.id}/images`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });
      if (imgresponse.ok) {
        const addedimage = await imgresponse.json();
        dispatch(addImage(created.id,addedimage));
      }
    }
  };

export const fetchAddImage = (spotId,image) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });
    if (response.ok) {
      const addedimage = await response.json();
      dispatch(addImage(spotId,addedimage));
    }
  };
  
export const fetchEditSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
    });
    if (response.ok) {
      const edited = await response.json();
      dispatch(editSpot(edited));
    //   return edited
    }
  };

export const fetchDeleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({})
      });
      if (response.ok) {
        dispatch(deleteSpot(id));
      }
         
};

//spot reducer
const initialState = {allspots:{},singlespot:{},userspots:{},image:{}};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case LOAD_SPOTS: 
        newState = {...state,allspots:{...state.allspots}}
        action.Spots.forEach(spot => {
        newState.allspots[spot.id] = spot
        })
        return newState;
      case GET_USERSPOTS: 
        newState = {...state,userspots:{...state.userspots}}
        action.Spots.forEach(spot => {
        newState.userspots[spot.id] = spot
        })
        return newState;
      case DELETE_USERSPOTS:
        newState = {...state,userspots:{...state.userspots}}
        newState.userspots={}
        return newState;
      case GET_SINGLESPOT:
        newState = {...state,singlespot:{...state.singlespot}}
        newState.singlespot=action.spot
        return newState;
      case CREATE_SPOT:
        newState = {...state,allspots:{...state.allspots},userspots:{...state.userspots},singlespot:{...state.singlespot}}
        newState.allspots[action.spot.id]=action.spot
        newState.userspots[action.spot.id]=action.spot
        return newState
      case ADD_IMAGE:
        newState = {...state,allspots:{...state.allspots},image:{...state.image}}
        newState.image=action.image
        if(action.image.preview===true){
          newState.allspots[action.spotId]['previewImage']=action.image.url
        }
        return newState
      case EDIT_SPOT:
        newState = {...state,allspots:{...state.allspots},userspots:{...state.userspots}}
        newState.allspots[action.spot.id]={...newState.allspots[action.spot.id],...action.spot}
        newState.userspots[action.spot.id]={...newState.allspots[action.spot.id],...action.spot}
        return newState
      case DELETE_SPOT:
        newState = {...state,allspots:{...state.allspots},userspots:{...state.userspots}}
        delete newState.allspots[action.id]
        delete newState.userspots[action.id]
        return newState
      default:
        return state;
    }
  };  

  export default spotReducer;