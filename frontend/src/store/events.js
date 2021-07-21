import { csrfFetch } from "./csrf";

const ADD_ONE = 'events/addOne';
const REMOVE_EVENT = 'events/removeEvent';

const addOne = (payload) => {
    return {
      type: ADD_ONE,
      payload
    };
  };
  
const removeEvent = () => {
    return {
      type: REMOVE_EVENT,
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

export const editEvent = (payload) => async dispatch => {
    const res = await fetch(`/api/events/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-type' : 'application/json' },
      body: JSON.stringify(payload)
    })
    const editedEvent = await res.json()
    if (res.ok) {
      dispatch(addOne(editedEvent))
    }
    return editedEvent
}

export const deleteEvent = () => async (dispatch) => {
    const response = await csrfFetch('/api/events', {
      method: 'DELETE',
    });
    dispatch(removeEvent());
    return response;
  };
  

const initialState = { list: []};

  
const eventReducer = (state = initialState, action) => {
  let newState;
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
      newState = Object.assign({}, state);
      newState.event = null;
      return newState;
    default:
      return state;
  }
};

export default eventReducer;