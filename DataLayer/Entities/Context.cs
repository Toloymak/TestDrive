namespace DataLayer.Entities
{
    using System.Collections.Generic;

    public class Context: BaseEntity
    {
        public string Name { get; set; }
        public int Priority { get; set; }
        
        public IList<Link> Links { get; set; }
    }
}