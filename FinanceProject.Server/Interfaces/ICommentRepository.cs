using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Helpers;
using FinanceProject.Server.Models;

namespace FinanceProject.Server.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> UpdateAsync(int id, Comment commentModel);
        Task<Comment?> DeleteAsync(int id);
    }
}
