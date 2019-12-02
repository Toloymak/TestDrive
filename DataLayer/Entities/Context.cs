namespace DataLayer.Entities
{
    using System.Collections.Generic;

    public class Context: BaseEntity
    {
        public string Name { get; set; }

        public int IndexNumber { get; set; }
        
        public IList<Link> Links { get; set; }
        public IList<HiddenContext> HiddenBlocks { get; set; }
        public IList<ContextOrder> BlockOrders { get; set; }
    }
}