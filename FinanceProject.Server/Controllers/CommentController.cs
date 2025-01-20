using FinanceProject.Server.Data;
using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace FinanceProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;


        public CommentController(ICommentRepository commentRepository,IStockRepository stockRepository)
        {
            this._commentRepository = commentRepository;
            this._stockRepository = stockRepository;

        }

        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            var comments = await _commentRepository.GetAllAsync();
            var commentsDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentsDto);
        }
        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById([FromRoute] int id) {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentModel = await _commentRepository.GetByIdAsync(id);

            if (commentModel == null) {
                return NotFound();
            }
            return Ok(commentModel);

        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _stockRepository.StockExist(stockId)) {
                return BadRequest("Stock does not exist");
            }
            var commentModel = commentDto.ToCommentFromCreateDto(stockId);
            var createdComment = await _commentRepository.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = createdComment.Id }, createdComment.ToCommentDto());
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentModel= await _commentRepository.UpdateAsync(id, commentDto.ToCommentFromUpdateDto());

            if (commentModel == null)
            {
                return NotFound("Comment not found");
            }
            return Ok(commentModel.ToCommentDto());

        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var commentModel = await _commentRepository.DeleteAsync(id);
            if (commentModel == null)
            {
                return NotFound("Comment does not exist");
            }
            return Ok(commentModel.ToCommentDto());
        }


    }
}
