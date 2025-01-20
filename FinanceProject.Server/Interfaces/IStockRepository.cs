using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Interfaces
{
    public interface IstockRepository
    {
        Task<List<Stock>> GetAllAsync();
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto);
        Task<Stock?> DeleteAsync(int id);

    }
}
