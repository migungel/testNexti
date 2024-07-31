import axios from 'axios';
require('dotenv').config();
// const apiUrl = window.config.apiUrl;
const apiUrl = process.env.API_URL;
// Acciones
export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  payload: events,
});

export const setCurrentEvent = (event) => ({
  type: 'SET_CURRENT_EVENT',
  payload: event,
});

export const addEvent = (event) => ({
  type: 'ADD_EVENT',
  payload: event,
});

export const updateEvent = (event) => ({
  type: 'UPDATE_EVENT',
  payload: event,
});

export const deleteEvent = (eventId) => ({
  type: 'DELETE_EVENT',
  payload: eventId,
});

// Acción asíncrona para obtener eventos
export const fetchEvents = () => async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Acción asíncrona para agregar un evento
export const createEvent = (event) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, event);
    dispatch(addEvent(response.data));
  } catch (error) {
    console.error('Error adding event:', error);
  }
};

// Acción asíncrona para actualizar un evento
export const modifyEvent = (event) => async (dispatch) => {
  try {
    await axios.put(`${apiUrl}/${event.id}`, event);
    dispatch(updateEvent(event));
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

// Acción asíncrona para eliminar un evento
export const removeEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/${eventId}`);
    dispatch(deleteEvent(eventId));
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};
