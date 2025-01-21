using FinanceProject.Server.Dtos.Account;
using FinanceProject.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinanceProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager)
        {
            this._userManager = userManager;


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
                    return Ok("User Created Successfully");
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
    }
}
