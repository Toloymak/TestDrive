using System;

namespace DatabaseLayer.Entities.Link
{
    public class LinkDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public int Priority { get; set; }
        public Guid BlockId { get; set; }
    }
}