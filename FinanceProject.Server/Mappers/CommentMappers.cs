using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Models;

namespace FinanceProject.Server.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment commentModel) {
        
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                StockId = commentModel.StockId
            };

        }

        public static Comment ToCommentFromCreateDto(UpdateCommentRequestDto updateCommentRequestDto)
        {

            return new Comment
            {
                Title = updateCommentRequestDto.Title,
                Content = updateCommentRequestDto.Content,
                CreatedOn = updateCommentRequestDto.CreatedOn,
                StockId = updateCommentRequestDto.StockId
            };
        }

    }
}
