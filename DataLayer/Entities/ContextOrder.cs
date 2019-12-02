namespace DataLayer.Entities
{
    using System;

    public class ContextOrder: BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid ContextId { get; set; }
        public int IndexNumber { get; set; }
        
        public User User { get; set; }
        public Context Context { get; set; }
    }
}