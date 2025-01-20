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

        public static Comment ToCommentFromCreateDto(this CreateCommentRequestDto commentMode,int id)
        {

            return new Comment
            {
                Title = commentMode.Title,
                Content = commentMode.Content,
                StockId = id

            };
        }
        public static Comment ToCommentFromUpdateDto(this UpdateCommentRequestDto commentModel)
        {

            return new Comment
            {
                Title = commentModel.Title,
                Content = commentModel.Content,
              

            };
        }

    }
}
