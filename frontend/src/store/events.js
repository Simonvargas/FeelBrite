import { csrfFetch } from "./csrf";

const ADD_ONE = 'events/addOne';
const REMOVE_USER = 'session/removeUser';

const addOne = (payload) => {
    return {
      type: ADD_ONE,
      payload
    };
  };
  
// const removeUser = () => {
//     return {
//       type: REMOVE_USER,
//     };
//   };
  


 export const addEvent = (payload) => async (dispatch) => {
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

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//       method: 'DELETE',
//     });
//     dispatch(removeUser());
//     return response;
//   };
  

// export const restoreUser = () => async dispatch => {
//     const response = await csrfFetch('/api/session');
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

const initialState = { user: null };

  
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_ONE:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;