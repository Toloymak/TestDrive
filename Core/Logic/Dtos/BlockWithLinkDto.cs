namespace Core.Logic.Dtos
{
    using System;
    using System.Collections.Generic;

    public class BlockWithLinkDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public IList<LinkDto> Links { get; set; }
    }
}