using System;

namespace DataLayer.Entities
{
    public class Link: BaseEntity
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int IndexNumber { get; set; }
        public DateTime EndOfUse { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid ContextId { get; set; }
        public Context Context { get; set; }
    }
}
