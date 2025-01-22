using FinanceProject.Server.Models;

namespace FinanceProject.Server.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}
