using GeneralExampleSvc.Data.Models;
using GeneralExampleSvc.Models;
using GeneralExampleSvc.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GeneralExampleSvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _service;

        public UsersController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IUserService service)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _service = service;
        }

        // GET All Users
        [HttpGet("all")]
        public IEnumerable<UserViewModel> All()
        { 
            return _service.All(); 
        }

        // POST Register User
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            // TODO
            var user = new User()
            {
                UserName = model.UserName,
                FullName = model.FullName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return this.BadRequest();
            }

            _service.Add(user);

            // Automatically sign in user ? 
            //this.signInManager.SignInAsync(user, false);

            return this.Ok(GenerateJwtToken(model.Email, user));
        }

        // POST Login User
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(
                model.UserName, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return this.BadRequest();
            }

            var appUser = _userManager.Users.SingleOrDefault(u => u.UserName == model.UserName);
            return this.Ok(GenerateJwtToken(model.UserName, appUser));
        }

        // POST Logout User
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            Debug.WriteLine("ok");

            return this.Ok();
        }

        private object GenerateJwtToken(string email, IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
