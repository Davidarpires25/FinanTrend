using FinanceProject.Server.Models;

namespace FinanceProject.Server.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
