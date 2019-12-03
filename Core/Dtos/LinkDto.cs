namespace Core.Dtos
{
    using System;

    public class LinkDto
    {
        public Guid? Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int IndexNumber { get; set; }
        public Guid ContextId { get; set; }
        public Guid UserId { get; set; }
        public DateTime EndOfUse { get; set; }
    }
}