using AutoMapper;
using AutoMapper.QueryableExtensions;
using GeneralExampleSvc.Data;
using GeneralExampleSvc.Data.Models;
using GeneralExampleSvc.Models;

namespace GeneralExampleSvc.Services
{
    public class UserService : IUserService
    {
        private readonly DbContextExample _dbContextExample;
        private readonly IMapper _mapper;
        public UserService(DbContextExample db, IMapper mapper)
        {
            _dbContextExample = db;
            _mapper = mapper;
        }

        public IEnumerable<UserViewModel> All()
        { 
            var x=_mapper.ProjectTo<UserViewModel>(_dbContextExample.Users);
            return x;
        }

        // TODO: Maybe we shouldn't pass a model from db
        // -- use autmapper
        public void Add(User user)
        {
            var exists = Exists(user.Id);

            if (!exists)
            {
                _dbContextExample.Users.Add(user);
                _dbContextExample.SaveChanges();
            }

        }

        public bool Exists(string id)
            => _dbContextExample.Users.Any(u => u.Id == id);
    }
}
