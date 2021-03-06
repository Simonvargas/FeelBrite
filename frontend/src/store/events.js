import { csrfFetch } from "./csrf";

const ADD_ONE = 'events/addOne';
const REMOVE_EVENT = 'events/removeEvent';

const addOne = (payload) => {
    return {
      type: ADD_ONE,
      payload
    };
  };
  
const removeEvent = (eventId) => {
    return {
      type: REMOVE_EVENT,
      eventId
    };
  };
  


 export const addEvent = (payload) => async (dispatch) => {
 

    const response = await csrfFetch("/api/events", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const newEvent = await response.json();
    dispatch(addOne(newEvent))
    return newEvent;
  };

  export const Register = (payload) => async (dispatch) => {
   const response = await csrfFetch("/api/registration", {
     method: "POST",
     body: JSON.stringify(payload),
   });
   if (response.ok) {
   const registration = await response.json();
   dispatch(addOne(registration))
   return registration;
   }
 };

 export const Register2 = (payload) => async (dispatch) => {
  console.log(payload)
 const response = await csrfFetch("/api/bookmark", {
   method: "POST",
   body: JSON.stringify(payload),
 });
 if (response.ok) {
 const registration = await response.json();
 dispatch(addOne(registration))
 return registration;
 }
};

export const editEvent = (payload) => async dispatch => {
    console.log(payload)
    const res = await csrfFetch(`/api/events/${payload.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      const editedEvent = await res.json()
      dispatch(addOne(editedEvent))
      return editedEvent
    }
}

export const deleteEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    });
    dispatch(removeEvent());
    return response;
  };

  export const deleteRegister = (eventId) => async (dispatch) => {
    console.log('hello')
    const response = await csrfFetch(`/api/registration/${eventId}`, {
      method: 'DELETE',
    });
    dispatch(removeEvent());
    return response;
  };

  export const unbookmark = (payload) => async (dispatch) => {
    console.log(payload)
    const response = await csrfFetch(`/api/bookmark/`, {
      method: 'DELETE',
      userId: payload.sessionUserId,
      eventId: payload.eventId,
    });
    dispatch(removeEvent());
    return response;
  };

 
  
const initialState = { list: []};

  
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
    case REMOVE_EVENT:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default eventReducer;