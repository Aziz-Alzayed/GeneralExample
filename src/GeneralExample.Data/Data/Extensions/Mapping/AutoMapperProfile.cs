using GeneralExampleSvc.Data.Models;
using AutoMapper;
using GeneralExampleSvc.Models;

namespace GeneralExampleSvc.Data.Extensions.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // List all mapping objects here
            CreateMap<User, UserViewModel>();
        }
    }
}
