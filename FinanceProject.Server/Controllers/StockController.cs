using FinanceProject.Server.Data;
using Microsoft.AspNetCore.Mvc;
using FinanceProject.Server.Mappers;
using FinanceProject.Server.Dtos.Stock;
using Microsoft.EntityFrameworkCore;
using FinanceProject.Server.Interfaces;

namespace FinanceProject.Server.Controllers
{

    [ApiController]
    [Route("api/Stock")]
    public class StockController : Controller
    {
        private readonly ApplicationDBContext _dBContext;
        private readonly IstockRepository _stockRepo;

        public StockController(ApplicationDBContext context, IstockRepository stockRepo )
        {
            this._stockRepo = stockRepo;

            this._dBContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStocks()
        {
            var stocks = await _stockRepo.GetAllAsync();
            var stocksDto=stocks.Select(s => s.ToStockDto());


            return StatusCode(StatusCodes.Status200OK, stocksDto);


        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var stock = await _stockRepo.GetByIdAsync(id);
            if (stock == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Stock not found");
            }
            return StatusCode(StatusCodes.Status200OK, stock.ToStockDto());
        }

        [HttpPost]

        public async Task<IActionResult> setStock([FromBody] CreateStockRequestDto stockDto) {
            var stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepo.CreateAsync(stockModel);

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> updateStock([FromRoute] int id, [FromBody] UpdateStockRequestDto stockDto) {
            var stockModel = await _stockRepo.UpdateAsync(id,stockDto);

            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task <IActionResult> deleteStock([FromRoute] int id) {
            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null) {
                return NotFound();
            }
            return NoContent();
        }


    }
}
