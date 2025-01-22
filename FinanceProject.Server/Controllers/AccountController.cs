using FinanceProject.Server.Dtos.Account;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _TokenService;
        private readonly SignInManager<AppUser> _SignInManager;
        public AccountController(UserManager<AppUser> userManager,ITokenService Token, SignInManager<AppUser> SignInManager)
        {
            _userManager = userManager;
            _TokenService = Token;
            _SignInManager = SignInManager;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var account = new AppUser
                {
                    UserName = registerRequestDto.UserName,
                    Email = registerRequestDto.Email

                };
                var CreateUser = await _userManager.CreateAsync(account, registerRequestDto.Password);
                if (CreateUser.Succeeded)
                {

                    var roleResult = await _userManager.AddToRoleAsync(account, "User");
                    if (!roleResult.Succeeded)
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                    return Ok(new CreateUserDto {
                        UserName = account.UserName,
                        Email = account.Email,
                        Token= _TokenService.CreateToken(account)
                    });
                }
                else
                {
                    return StatusCode(500, CreateUser.Errors);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto ) { 

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
                
            }
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid UserName");
            }
            var result = await _SignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Username Not Found And/Or Password Incorrect");
            }
            return Ok(new CreateUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _TokenService.CreateToken(user)
            });
        }
    }
}
