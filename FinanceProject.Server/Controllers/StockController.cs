using FinanceProject.Server.Data;
using Microsoft.AspNetCore.Mvc;
using FinanceProject.Server.Mappers;
using FinanceProject.Server.Dtos.Stock;
using Microsoft.EntityFrameworkCore;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using FinanceProject.Server.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace FinanceProject.Server.Controllers
{

    [ApiController]
    [Route("api/Stock")]
    public class StockController : Controller
    {
        private readonly ApplicationDBContext _dBContext;
        private readonly IStockRepository _stockRepo;

        public StockController(ApplicationDBContext context, IStockRepository stockRepo )
        {
            this._stockRepo = stockRepo;

            this._dBContext = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetStocks([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stocks = await _stockRepo.GetAllAsync(query);
            var stocksDto=stocks.Select(s => s.ToStockDto());


            return StatusCode(StatusCodes.Status200OK, stocksDto);


        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stock = await _stockRepo.GetByIdAsync(id);
            if (stock == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Stock not found");
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]

        public async Task<IActionResult> setStock([FromBody] CreateStockRequestDto stockDto) {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepo.CreateAsync(stockModel);

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> updateStock([FromRoute] int id, [FromBody] UpdateStockRequestDto stockDto) {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockModel = await _stockRepo.UpdateAsync(id,stockDto.ToStockFromUpdateDto());

            if (stockModel == null)
            {
                return NotFound("stock not found");
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task <IActionResult> deleteStock([FromRoute] int id) {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null) {
                return NotFound("stock not found");
            }
            return NoContent();
        }


    }
}
