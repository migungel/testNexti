using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsAPI.Data;
using TicketsAPI.Models;

namespace TicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventContext _context;

        public EventsController(EventContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents(int page = 1, int pageSize = 10)
        {
            var events = _context.Events
                .Where(e => e.IsDeleted == false)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return await events.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null || @event.IsDeleted)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = @event.Id }, @event);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            //if (id != @event.Id)
            //{
            //    return BadRequest("ID del evento no coincide.");
            //}

            var existingEvent = await _context.Events.FindAsync(id);
            if (existingEvent == null)
            {
                return NotFound("Evento no encontrado.");
            }

            //_context.Entry(@event).State = EntityState.Modified;
            existingEvent.EventDate = @event.EventDate;
            existingEvent.EventPlace = @event.EventPlace;
            existingEvent.Description = @event.Description;
            existingEvent.Price = @event.Price;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound("Evento no encontrado.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            @event.IsDeleted = true;
            _context.Entry(@event).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
