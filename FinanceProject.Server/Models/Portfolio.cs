using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceProject.Server.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string UserId { get; set; } 
        public int StockId { get; set; } 
        public AppUser AppUser { get; set; } 
        public Stock Stock { get; set; } 
    }
}
