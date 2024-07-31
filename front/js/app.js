import store from './store';
import { fetchEvents, createEvent, modifyEvent, removeEvent } from './actions';

// Ejemplo de obtener eventos al iniciar
store.dispatch(fetchEvents());

// Función para mostrar eventos en la página
function displayEvents() {
  const state = store.getState();
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = ''; // Limpiar lista existente
  state.events.forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${new Date(event.eventDate).toLocaleDateString()}</td>
            <td>${event.eventPlace}</td>
            <td>${event.description}</td>
            <td>${event.price}</td>
            <td>
                <button onclick="editEvent(${event.id})">Editar</button>
                <button onclick="deleteEvent(${event.id})">Eliminar</button>
            </td>
        `;
    eventList.appendChild(row);
  });
}

// Función para manejar la edición de eventos
function editEvent(eventId) {
  const state = store.getState();
  const event = state.events.find(e => e.id === eventId);
  // Implementar lógica para editar el evento
  store.dispatch(setCurrentEvent(event));
}

// Función para manejar la eliminación de eventos
function deleteEvent(eventId) {
  store.dispatch(removeEvent(eventId));
  displayEvents(); // Actualizar la lista después de eliminar
}

// Función para manejar el envío del formulario
document.getElementById('event-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const newEvent = {
    eventDate: form.querySelector('#event-date').value,
    eventPlace: form.querySelector('#event-place').value,
    description: form.querySelector('#event-description').value,
    price: form.querySelector('#event-price').value,
  };
  const state = store.getState();
  if (state.currentEvent) {
    const updatedEvent = { ...state.currentEvent, ...newEvent };
    store.dispatch(modifyEvent(updatedEvent));
  } else {
    store.dispatch(createEvent(newEvent));
  }
  displayEvents(); // Actualizar la lista después de agregar/editar
});


// $(document).ready(function () {
//   const eventForm = $('#event-form');
//   const eventList = $('#event-list');
//   const pagination = $('#pagination');
//   const apiUrl = window.config.apiUrl;

//   let editingEventId = null;
//   let currentPage = 1;
//   const pageSize = 10;

//   // Función para cargar eventos desde la API
//   function loadEvents(page = 1) {
//     $.getJSON(`${apiUrl}?page=${page}&pageSize=${pageSize}`, function (data) {
//       eventList.empty();
//       data.forEach(event => {
//         const eventRow = `
//               <tr>
//                   <td>${new Date(event.eventDate).toLocaleDateString()}</td>
//                   <td>${event.eventPlace}</td>
//                   <td>${event.description}</td>
//                   <td>${event.price}</td>
//                   <td>
//                       <button class="btn btn-warning btn-edit" data-id="${event.id}">Editar</button>
//                       <button class="btn btn-danger btn-delete" data-id="${event.id}">Eliminar</button>
//                   </td>
//               </tr>
//           `;
//         eventList.append(eventRow);
//       });

//       // Actualizar controles de paginación
//       updatePaginationControls();
//     }).fail(function () {
//       console.error("Error al conectar con la API.");
//     });
//   }

//   function updatePaginationControls() {
//     // Ejemplo simple de paginación; ajusta según tu necesidad
//     pagination.empty();
//     pagination.append(`
//         <button class="btn btn-primary" ${currentPage === 1 ? 'disabled' : ''} id="prev-page">Anterior</button>
//         <span>Página ${currentPage}</span>
//         <button class="btn btn-primary" id="next-page">Siguiente</button>
//     `);

//     $('#prev-page').click(function () {
//       if (currentPage > 1) {
//         currentPage--;
//         loadEvents(currentPage);
//       }
//     });

//     $('#next-page').click(function () {
//       currentPage++;
//       loadEvents(currentPage);
//     });
//   }

//   // Cargar eventos al inicio
//   loadEvents(currentPage);

//   // Manejar el envío del formulario
//   eventForm.on('submit', function (e) {
//     e.preventDefault();

//     const eventData = {
//       eventDate: $('#event-date').val(),
//       eventPlace: $('#event-place').val(),
//       description: $('#event-description').val(),
//       price: $('#event-price').val()
//     };

//     if (editingEventId) {
//       // Si estamos editando, actualizamos el evento
//       $.ajax({
//         url: `${apiUrl}/${editingEventId}`,
//         method: 'PUT',
//         contentType: 'application/json',
//         data: JSON.stringify(eventData),
//         success: function () {
//           loadEvents();
//           eventForm[0].reset();
//           editingEventId = null; // Limpiar ID de edición
//         }
//       }).fail(function () {
//         console.error("Error al conectar con la API.");
//       });
//     } else {
//       // Si no estamos editando, creamos un nuevo evento
//       $.ajax({
//         url: apiUrl,
//         method: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(eventData),
//         success: function () {
//           loadEvents();
//           eventForm[0].reset();
//         }
//       }).fail(function () {
//         console.error("Error al conectar con la API.");
//       });
//     }
//   });

//   // Manejar eliminación de eventos
//   eventList.on('click', '.btn-delete', function () {
//     const eventId = $(this).data('id');
//     $.ajax({
//       url: `${apiUrl}/${eventId}`,
//       method: 'DELETE',
//       success: function () {
//         loadEvents();
//       }
//     });
//   });

//   // Manejar edición de eventos (opcional)
//   eventList.on('click', '.btn-edit', function () {
//     const row = $(this).closest('tr');
//     const date = row.find('td:eq(0)').text();
//     const place = row.find('td:eq(1)').text();
//     const description = row.find('td:eq(2)').text();
//     const price = row.find('td:eq(3)').text();
//     editingEventId = $(this).data('id');

//     const formattedDate = new Date(date).toISOString().split('T')[0];

//     $('#event-date').val(formattedDate);
//     $('#event-place').val(place);
//     $('#event-description').val(description);
//     $('#event-price').val(price);

//     // Aquí podrías agregar lógica para actualizar el evento si lo deseas.
//     // Por ahora solo quitamos la fila para simular la edición.
//     row.remove();
//   });
// });
