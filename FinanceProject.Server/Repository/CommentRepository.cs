using FinanceProject.Server.Data;
using FinanceProject.Server.Dtos.Comment;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceProject.Server.Repository
{
    public class CommentRepository: ICommentRepository
    {
        private readonly ApplicationDBContext _dBContext;

        public CommentRepository(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _dBContext.Comments.AddAsync(commentModel);
            await _dBContext.SaveChangesAsync();

            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel= await _dBContext.Comments.FirstOrDefaultAsync(x => x.Id==id);
            if (commentModel == null)
            {
                return null;
            }
            _dBContext.Comments.Remove(commentModel);
            await _dBContext.SaveChangesAsync();
            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _dBContext.Comments.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _dBContext.Comments.Include(a=>a.AppUser).FirstOrDefaultAsync(x => x.Id==id);

        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto commentDto)
        {
            var commentModel = await _dBContext.Comments.FirstOrDefaultAsync(x => x.Id == id);
           
            if (commentModel == null)
            {
                return null;
            }
            commentModel.Title = commentDto.Title;
            commentModel.Content = commentDto.Content;
         

            return commentModel;
            

        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var comment = await _dBContext.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null)
            {
                return null;
            }
            comment.Title = commentModel.Title;
            comment.Content = commentModel.Content;
            await _dBContext.SaveChangesAsync();
            return comment;
        }
    }
}
