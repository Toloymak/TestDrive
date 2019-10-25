using System.Collections.Generic;
using DatabaseLayer.Entities.Base;
using DataLayer.Entities;

namespace DatabaseLayer.Entities.Blocks
{
    public class Block: EntityBase
    {
        public string Name { get; set; }
        public int Priority { get; set; }
        
        public IList<Link> Links { get; set; }
    }
}