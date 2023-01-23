using Microsoft.AspNetCore.Identity;

namespace GeneralExampleSvc.Data.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }

        public IEnumerable<Score> Scores { get; set; } = new List<Score>();
    }
}
