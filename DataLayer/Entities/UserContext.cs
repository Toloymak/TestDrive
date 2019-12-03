namespace DataLayer.Entities
{
    using System;

    public class UserContext: BaseEntity
    {
        public int IndexNumber { get; set; }
        public bool IsHidden { get; set; }

        public Guid ContextId { get; set; }
        public Context Context { get; set; }
        
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}