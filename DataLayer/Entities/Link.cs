using System;

namespace DataLayer.Entities
{
    public class Link: BaseEntity
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int IndexNumber { get; set; }

        public Guid ContextId { get; set; }
        public virtual Context Context { get; set; }
    }
}