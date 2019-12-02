namespace Core.Logic.Dtos
{
    using System;
    using System.ComponentModel;

    public class BlockDto
    {
        public Guid? Id { get; set; }

        [Description("Тест описания")]
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}