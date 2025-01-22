using System.Linq;
using FinanceProject.Server.Data;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _dBContext;
        public PortfolioRepository(ApplicationDBContext dBContext) {
            _dBContext = dBContext;
        }
        public  async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _dBContext.Portfolios.Where(x => x.UserId == user.Id).
                Select(stock => 
                    new Stock
                    {
                        Id = stock.StockId,
                        Symbol = stock.Stock.Symbol,
                        CompanyName = stock.Stock.CompanyName,

                        Purchase = stock.Stock.Purchase,
                        LastDiv = stock.Stock.LastDiv,
                        Industry = stock.Stock.Industry,
                        MarketCap = stock.Stock.MarketCap

                    }).ToListAsync();

          
    


        }

        public async Task<Portfolio> CreatePortfolio(Portfolio portfolio) {            
            await _dBContext.Portfolios.AddAsync(portfolio);
            await _dBContext.SaveChangesAsync();

            return(portfolio);

        }

        public async Task<Portfolio?> DeletePortfolio(AppUser user, string symbol)
        {

            var portfolioModel = await _dBContext.Portfolios.FirstOrDefaultAsync(x => x.UserId == user.Id && x.Stock.Symbol == symbol);
            

            if(portfolioModel == null)
            {
                return null;
            }
            _dBContext.Portfolios.Remove(portfolioModel);
            await _dBContext.SaveChangesAsync();
            return portfolioModel;
        }
    }
}
