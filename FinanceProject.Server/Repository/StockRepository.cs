using FinanceProject.Server.Data;
using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Repository
{
    public class StockRepository : IstockRepository
    {
        private readonly ApplicationDBContext _dBContext;

        public StockRepository(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _dBContext.Stocks.AddAsync(stockModel);
            await _dBContext.SaveChangesAsync();

            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _dBContext.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);
            if (stockModel == null)
            {
                return null;
            }
            _dBContext.Stocks.Remove(stockModel);
            await _dBContext.SaveChangesAsync();

            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync()
        {
            return await _dBContext.Stocks.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _dBContext.Stocks.FindAsync(id); 
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var stockModel = await _dBContext.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(x => x.Id == id);
            if (stockModel == null)
            {
                return null;
            }
            stockModel.Symbol = stockDto.Symbol;
            stockModel.CompanyName = stockDto.CompanyName;
            stockModel.Purchase = stockDto.Purchase;
            stockModel.LastDiv = stockDto.LastDiv;
            stockModel.Industry = stockDto.Industry;
            stockModel.MarketCap = stockDto.MarketCap;

            await _dBContext.SaveChangesAsync();

            return stockModel;

        }
    }
}
