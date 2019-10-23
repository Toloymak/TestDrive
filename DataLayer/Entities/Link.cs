using System;
using DatabaseLayer.Entities.Base;
using DatabaseLayer.Entities.Blocks;

namespace DatabaseLayer.Entities.Link
{
    public class Link: EntityBase
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public int Priority { get; set; }
        public Guid BlockId { get; set; }
        
        public virtual Block Block { get; set; }
    }
}