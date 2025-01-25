using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Extensions;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using FinanceProject.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinanceProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepository;
        private readonly IFMPService _fMPService;

        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepository,IPortfolioRepository portfolioRepository, IFMPService fMPService)
        {
            _userManager = userManager;
            _stockRepository = stockRepository;
            _portfolioRepository = portfolioRepository;
            _fMPService = fMPService;

        }

        [HttpGet]
        public async Task<IActionResult> GetUserPortfolio() {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var userPortfolio = await _portfolioRepository.GetUserPortfolio(appUser);
            return Ok(userPortfolio);


        }

        [HttpPost]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepository.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _fMPService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    Console.WriteLine("Stock does not exist");
                    return BadRequest("Stock does not exist");
                }
                else
                {
                    await _stockRepository.CreateAsync(stock);
                }
            }

            var userPortfolio = await _portfolioRepository.GetUserPortfolio(appUser);
            if (userPortfolio.Any(p => p.Symbol.ToLower() == symbol.ToLower()))
            {
                Console.WriteLine("Stock already in portfolio");
                return BadRequest("Stock already in portfolio");
            }

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser.Id,
                AppUser = appUser,
                Stock = stock,
            };

            await _portfolioRepository.CreatePortfolio(portfolioModel);

            if (portfolioModel == null)
            {
                Console.WriteLine("Error creating portfolio 500");
                return StatusCode(500, "Error creating portfolio");
            }

            Console.WriteLine("Portfolio created successfully");
            return StatusCode(StatusCodes.Status200OK, portfolioModel);
        }

        [HttpDelete]
  
        public async Task<IActionResult> DeletePortfolio(string symbol) {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepository.GetBySymbolAsync(symbol);
            var listStock = await _portfolioRepository.GetUserPortfolio(appUser);
            var filteredStock = listStock.Where( p=> p.Symbol.ToLower() == symbol.ToLower()).ToList();


            if (filteredStock.Count() == 1)
            {
                await _portfolioRepository.DeletePortfolio(appUser, symbol);
            }
            else {

                return BadRequest("Stock does not exist in portfolio");
            }

            return Ok();

        }


    }
}
