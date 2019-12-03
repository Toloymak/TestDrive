namespace Core.Mapping.Extensions
{
    using System;

    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public static class UserContextMappingExtensions
    {
        public static UserContext ToEntity(this UserContextDto dto, IMapper mapper, Guid userId)
        {
            var userContext = mapper.Map<UserContext>(dto);
            userContext.UserId = userId;
            
            return userContext;
        }
    }
}