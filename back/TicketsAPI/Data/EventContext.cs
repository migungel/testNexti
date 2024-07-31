using Microsoft.EntityFrameworkCore;
using TicketsAPI.Models;

namespace TicketsAPI.Data
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>()
                .Property(e => e.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}
