using AutoMapper;
using DuckDuck.Dto;
using DuckDuck.Helpers;

namespace DuckDuck.Api
{
    /// <summary>
    /// Objects mapping used by AutoMapper
    /// </summary>
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<Services.Models.RelatedTopics, DuckDuckGoSimplifiedListItem>()
                .ForMember(x => x.Title, config => config.MapFrom(y => StringParseHelper.GetTitleFromLink(y.Result ?? y.Text)))
                .ForMember(x => x.Url, config => config.MapFrom(y => y.FirstURL));
        }
    }
}