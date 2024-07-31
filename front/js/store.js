import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Estado inicial
const initialState = {
  events: [],
  currentEvent: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_CURRENT_EVENT':
      return { ...state, currentEvent: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
};

// Crear el store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
