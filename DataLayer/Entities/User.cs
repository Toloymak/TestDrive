namespace DataLayer.Entities
{
    using System.Collections.Generic;

    public class User: BaseEntity
    {
        public string Name { get; set; }
        
        public IList<ContextOrder> BlockOrders { get; set; }
        public IList<HiddenContext> HiddenBlocks { get; set; }
    }
}