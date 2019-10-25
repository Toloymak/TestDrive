using System;
using System.Collections.Generic;
using Core.Logic.Links;
using DataLayer.Entities;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockWithLinkDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public IList<LinkDto> Links { get; set; }
    }
}