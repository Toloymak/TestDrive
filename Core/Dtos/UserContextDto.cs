namespace Core.Dtos
{
    using System;

    public class UserContextDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ContextId { get; set; }
        public int IndexNumber { get; set; }
        public bool IsHidden { get; set; }
    }
}