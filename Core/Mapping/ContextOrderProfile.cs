namespace Core.Mapping
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class ContextOrderProfile : Profile
    {
        public ContextOrderProfile()
        {
            CreateMap<ContextOrder, ContextOrderDto>();
            CreateMap<ContextOrderDto, ContextOrder>();
        }
    }
}