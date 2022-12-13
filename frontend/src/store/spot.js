import { csrfFetch } from "./csrf";

//spot types
const LOAD_SPOTS = 'spots/loadSpots';
const GET_USERSPOTS = 'spots/getUserSpots'
const GET_SINGLESPOT = 'spots/getSingleSpot';
const CREAT_SPOT='spots/createSpot'
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

export const getSingleSpot = (spot) => {
    return {
      type: GET_SINGLESPOT,
      spot
    };
  };

export const createSpot = (spot) =>{
    return {
        type: CREAT_SPOT,
        spot
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

export const fetchOneSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (response.ok) {
    const spot = await response.json();
    dispatch(getSingleSpot(spot));
    }
};

export const fetchCreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
    });
    if (response.ok) {
      const created = await response.json();
      dispatch(createSpot(created));
    //   return created
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
const initialState = {allspots:{},singlespot:{},userspots:{}};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case LOAD_SPOTS: 
        newState = {...state}
        action.Spots.forEach(spot => {
        newState.allspots[spot.id] = spot
        })
        return newState;
      case GET_USERSPOTS: 
        newState = {...state}
        action.Spots.forEach(spot => {
        newState.userspots[spot.id] = spot
        })
        return newState;
      case GET_SINGLESPOT:
        newState = {...state}
        newState.singlespot[action.spot.id]=action.spot
        return newState;
      case CREAT_SPOT:
        newState = {...state}
        newState.allspots[action.spot.id]=action.spot
        newState.singlespot[action.spot.id]=action.spot
        newState.userspots[action.spot.id]=action.spot
        return newState
      case EDIT_SPOT:
        newState = {...state}
        newState.allspots[action.spot.id]=action.spot
        newState.singlespot[action.spot.id]=action.spot
        newState.userspots[action.spot.id]=action.spot
        return newState
      case DELETE_SPOT:
        newState = {...state}
        delete newState.allspots[action.id]
        delete newState.singlespot[action.id]
        delete newState.userspots[action.id]
        return newState
      default:
        return state;
    }
  };  

  export default spotReducer;