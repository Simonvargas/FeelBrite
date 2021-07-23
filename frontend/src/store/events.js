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
     console.log(payload)
    const response = await csrfFetch("/api/events", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (response.ok) {
    const newEvent = await response.json();
    dispatch(addOne(newEvent))
    return newEvent;
    }
  };

  export const Register = (payload) => async (dispatch) => {
    console.log(payload)
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
    console.log('hello')
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
  // export const deleteItem = itemId => async dispatch => {
  //   const response = await fetch(`/api/items/${itemId}`, {
  //     method: 'delete',
  //   });
  
  //   if (response.ok) {
  //     const item = await response.json();
  //     dispatch(remove(item.id, item.pokemonId));
  //   }
  // };
  
const initialState = { list: []};

  
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_ONE: {
   if (!state[action.payload.id]) {
       const newState = {...state, [action.payload.id]: action.payload};
       // takes care of adding
       const eventList = newState.list.map(id => newState[id]);
       eventList.push(action.payload);
       newState.list = eventList
        return newState;
   } // takes care of updating
   return {
       ...state, [action.payload.id]: { ...state[action.payload.id], ...action.payload,
   }
  };  
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