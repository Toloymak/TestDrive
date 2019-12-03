namespace Core.Logic.UserContexts
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Base;

    using DataLayer;
    using DataLayer.Entities;

    using Dtos;

    using Mapping.Extensions;

    public class UserContextWriter : WriterBase<UserContext, UserContextDto>
    {
        public UserContextWriter(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public bool SynchronizeUserContext(IEnumerable<UserContextDto> existingUserContextDtos,
                                           IEnumerable<UserContextDto> updatingUserContextDto,
                                           Guid userId,
                                           bool needSave)
        {
            if (existingUserContextDtos.Any())
            {
                var neededDeleteUserContext = existingUserContextDtos
                    .Where(x => updatingUserContextDto.All(c => c.Id != x.Id));

                foreach (var userContextDto in neededDeleteUserContext)
                {
                    this.Delete(userContextDto.Id, false);
                }

                var neededUpdateUserContext =
                    existingUserContextDtos.Where(x => updatingUserContextDto.Any(c => c.Id == x.Id));

                foreach (var userContextDto in neededUpdateUserContext)
                {
                    this.Update(userContextDto.ToEntity(Mapper, userId), false);
                }
            }

            var neededCreateUserContext = existingUserContextDtos.Any()
                ? updatingUserContextDto.Where(x => existingUserContextDtos.All(e => e.Id != x.Id))
                : updatingUserContextDto;
            
            foreach (var userContextDto in neededCreateUserContext)
            {
                this.Create(userContextDto.ToEntity(Mapper, userId));
            }

            if (needSave)
                DriveContext.SaveChanges();
            
            return true;
        }
    }
}