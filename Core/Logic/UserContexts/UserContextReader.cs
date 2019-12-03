namespace Core.Logic.UserContexts
{
    using AutoMapper;

    using Base;

    using DataLayer;
    using DataLayer.Entities;

    using Dtos;

    public class UserContextReader : ReaderBase<UserContext, UserContextDto>
    {
        public UserContextReader(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
    }
}