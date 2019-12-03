namespace Core.Logic.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Base;

    using DataLayer;
    using DataLayer.Entities;

    using Dtos;

    using Microsoft.EntityFrameworkCore;

    public class UserReader : ReaderBase<User, UserDto>
    {
        public UserReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public UserDto GetByName(string name)
        {
            var user = GetAllIncludeUserContext()
                .ToList()
                .FirstOrDefault(x => String.Equals(x.Name, name, StringComparison.CurrentCultureIgnoreCase));

            return this.Mapper.Map<UserDto>(user);
        }

        public UserDto GetWithUserContext(Guid userId)
        {
            var user = GetAllIncludeUserContext()
                .FirstOrDefault(x => x.Id == userId);
            
            return this.Mapper.Map<UserDto>(user);
        }
        
        public override IList<UserDto> GetAllDto()
        {
            var users = GetAllIncludeUserContext().ToList();
            return Mapper.Map<IList<UserDto>>(users);
        }

        private IQueryable<User> GetAllIncludeUserContext()
        {
            return this.All.Include(x => x.UserContexts).AsNoTracking();
        }
    }
}