namespace Core.Dtos
{
    using System;
    using System.Collections.Generic;

    public class ContextWithLinksDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int IndexNumber { get; set; }
        public IList<LinkDto> Links { get; set; }
    }
}