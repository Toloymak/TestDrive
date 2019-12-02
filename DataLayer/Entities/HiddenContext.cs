namespace DataLayer.Entities
{
    using System;

    public class HiddenContext : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid ContextId { get; set; }
        
        public User User { get; set; }
        public Context Context { get; set; }
    }
}