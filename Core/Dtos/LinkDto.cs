namespace Core.Dtos
{
    using System;

    public class LinkDto
    {
        public Guid? Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public Guid ContextId { get; set; }
    }
}