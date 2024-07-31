namespace TicketsAPI.Models
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime EventDate { get; set; }
        public string EventPlace { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsDeleted { get; set; }
    }
}
