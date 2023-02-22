import { csrfFetch } from "./csrf";

//spot types
const GET_SPOTBOOKING = 'bookings/loadBookings';
const GET_USERBOOKING = 'bookings/getUserBookings'
const DELETE_USERBOOKING='bookings/deleteUserBooking'
const CREATE_BOOKING='bookings/createBooking'
const EDIT_BOOKING='bookings/editBooking'
const DELETE_BOOKING='bookings/deleteBooking'


//spot actions
export const getSpotBooking = ({Bookings}) => {
    return {
      type: GET_SPOTBOOKING,
      Bookings
    };
  };

export const getUserBooking = ({Bookings}) => {
    return {
      type: GET_USERBOOKING,
      Bookings
    };
  };

export const deleteUserBookings = () => {
    return {
      type: DELETE_USERBOOKING,
    };
  };

export const createBooking = (booking) =>{
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const editBooking = (booking) =>{
    return {
        type: EDIT_BOOKING,
        booking
    }
}

export const deleteBooking = (id) =>{
    return {
        type: DELETE_BOOKING,
        id
    }
}


//spot thunk fetch
export const fetchSpotBookings = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
    const spotbookings = await response.json();
    dispatch(getSpotBooking(spotbookings));
    }
};

export const fetchUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    if (response.ok) {
    const userbookings = await response.json();
    dispatch(getUserBooking(userbookings));
    }
};

export const fetchCreateBooking = (spotId,booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    if (response.ok) {
      const created = await response.json();
      dispatch(createBooking(created));
    }
  };
  
export const fetchEditBooking = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    if (response.ok) {
      const edited = await response.json();
      dispatch(editBooking(edited));

    }
  };

export const fetchDeleteBooking = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`,{
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteBooking(id));
      }
};



//spot reducer
const initialState = {spotbookings:{},userbookings:{}};

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_SPOTBOOKING: 
        newState = {...state,spotbookings:{...state.spotbookings}}
        action.Bookings.forEach(booking => {
        newState.spotbookings[booking.id] = booking
        })
        return newState;
      case GET_USERBOOKING: 
        newState = {...state,userbookings:{...state.userbookings}}
        action.Bookings.forEach(booking => {
        newState.userbookings[booking.id] = booking
        })
        return newState;
      case DELETE_USERBOOKING:
        newState = {...state,spotbookings:{...state.spotbookings},userbookings:{...state.userbookings}}
        newState.userspots={spotbookings:{},userbookings:{}}
        return newState;
      case CREATE_BOOKING:
        newState = {...state,spotbookings:{...state.spotbookings},userbookings:{...state.userbookings}}
        newState.spotbookings[action.booking.id]=action.booking
        newState.userbookings[action.booking.id]=action.booking
        return newState
      case EDIT_BOOKING:
        newState = {...state,spotbookings:{...state.spotbookings},userbookings:{...state.userbookings}}
        newState.spotbookings[action.booking.id]={...newState.spotbookings[action.booking.id],...action.booking}
        newState.userbookings[action.booking.id]={...newState.userbookings[action.booking.id],...action.booking}
        return newState
      case DELETE_BOOKING:
        newState = {...state,spotbookings:{...state.spotbookings},userbookings:{...state.userbookings}}
        delete newState.spotbookings[action.id]
        delete newState.userbookings[action.id]
        return newState
      default:
        return state;
    }
  };  

  export default bookingReducer;