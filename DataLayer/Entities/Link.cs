using System;
using DatabaseLayer.Entities.Base;
using DatabaseLayer.Entities.Blocks;

namespace DataLayer.Entities
{
    public class Link: EntityBase
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        
        public Guid BlockId { get; set; }
        public virtual Block Block { get; set; }
    }
}