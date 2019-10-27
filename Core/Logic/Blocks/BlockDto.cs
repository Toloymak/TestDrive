using System;
using System.ComponentModel;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockDto
    {
        public Guid? Id { get; set; }

        [Description("Тест описания")]
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}