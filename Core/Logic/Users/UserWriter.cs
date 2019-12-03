namespace Core.Logic.Users
{
    using System;
    
    using AutoMapper;

    using Base;

    using DataLayer;
    using DataLayer.Entities;

    using Dtos;

    using UserContexts;

    public class UserWriter : WriterBase<User, UserDto>
    {
        private readonly UserReader userReader;
        private readonly UserContextWriter userContextWriter;

        public UserWriter(DriveContext driveContext,
                          IMapper mapper,
                          UserReader userReader,
                          UserContextWriter userContextWriter) 
            : base(driveContext, mapper)
        {
            this.userReader = userReader;
            this.userContextWriter = userContextWriter;
        }

        public override Guid Create(UserDto userDto, bool needSave = true)
        {
            var existingUser = userReader.GetByName(userDto.Name);

            if (existingUser != null)
                throw new ArgumentException($"Пользвоатель {userDto.Name} уже существует");

            var userGuid = base.Create(userDto, needSave);

            return userGuid;
        }

        public override Guid Update(UserDto dto, bool needSave = true)
        {
            var existingUserContextDtos = userReader.GetWithUserContext(dto.Id).UserContexts;

           userContextWriter.SynchronizeUserContext(existingUserContextDtos, dto.UserContexts, dto.Id, false);

           dto.UserContexts = null;
            return base.Update(dto, needSave);
        }
    }
}