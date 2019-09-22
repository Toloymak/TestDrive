using System;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}