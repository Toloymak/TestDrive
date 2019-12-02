namespace Core.Dtos
{
    using System;
    using System.Collections.Generic;

    using Core.Logic.Dtos;

    public class ContextWithLinksDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public IList<LinkDto> Links { get; set; }
    }
}