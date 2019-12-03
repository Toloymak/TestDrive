namespace Core.Dtos
{
    using System;
    using System.Collections.Generic;

    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public IList<UserContextDto> UserContexts { get; set; }
    }
}