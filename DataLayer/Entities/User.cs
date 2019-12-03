namespace DataLayer.Entities
{
    using System.Collections.Generic;

    public class User: BaseEntity
    {
        public string Name { get; set; }
        
        public virtual IList<UserContext> UserContexts { get; set; }
    }
}