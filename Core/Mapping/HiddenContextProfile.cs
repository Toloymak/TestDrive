namespace Core.Mapping
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class HiddenContextProfile : Profile
    {
        public HiddenContextProfile()
        {
            CreateMap<HiddenContext, HiddenContextDto>();
            CreateMap<HiddenContextDto, HiddenContextDto>();
        }
    }
}