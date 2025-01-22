using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Helpers;
using FinanceProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock?> GetBySymbolAsync(string symbol);


        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, Stock stockDto);
        Task<Stock?> DeleteAsync(int id);
        Task<bool> StockExist(int id);

    }
}
