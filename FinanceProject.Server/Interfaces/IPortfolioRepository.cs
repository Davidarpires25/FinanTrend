using FinanceProject.Server.Models;

namespace FinanceProject.Server.Interfaces
{
    public interface IPortfolioRepository
    {

        Task<List<Stock>> GetUserPortfolio(AppUser user);
        Task<Portfolio> CreatePortfolio(Portfolio portfolio);

        Task<Portfolio?> DeletePortfolio(AppUser user,string symbol);
    }
}
