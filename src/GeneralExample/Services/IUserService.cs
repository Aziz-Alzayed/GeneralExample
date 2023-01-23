using GeneralExampleSvc.Data.Models;
using GeneralExampleSvc.Models;

namespace GeneralExampleSvc.Services
{
    public interface IUserService
    {
        IEnumerable<UserViewModel> All();
        void Add(User user);
        bool Exists(string id);
    }
}
