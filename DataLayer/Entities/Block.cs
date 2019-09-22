using DatabaseLayer.Entities.Base;

namespace DatabaseLayer.Entities.Blocks
{
    public class Block: EntityBase
    {
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}