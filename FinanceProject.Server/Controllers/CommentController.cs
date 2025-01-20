using FinanceProject.Server.Data;
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

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            var comments = await _commentRepository.GetAllAsync();
            var commentsDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentsDto);
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> GetById([FromRoute] int id) {
            var commentModel = await _commentRepository.GetByIdAsync(id);

            if (commentModel == null) {
                return NotFound();
            }
            return Ok(commentModel);

        }

    }
}
