﻿using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceProject.Server.Models
{
    [Table("Comment")]

    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }=DateTime.Now;
        public int? StockId { get; set; }
        public Stock? Stock { get; set; } = null!; //Propiedad de navegacion

        public string? UserId { get; set; }
        public AppUser? AppUser { get; set; } = null!; //Propiedad de navegacion
    }
}
