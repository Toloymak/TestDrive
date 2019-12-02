namespace Core.Logic.Users
{
    using AutoMapper;

    using Base;

    using DataLayer;
    using DataLayer.Entities;

    using Dtos;

    public class UserReader : ReaderBase<User, UserDto>
    {
        public UserReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}