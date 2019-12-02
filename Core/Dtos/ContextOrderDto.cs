namespace Core.Dtos
{
    using System;

    public class ContextOrderDto
    {
        public Guid UserId { get; set; }
        public Guid ContextId { get; set; }
        public int IndexNumber { get; set; }
    }
}