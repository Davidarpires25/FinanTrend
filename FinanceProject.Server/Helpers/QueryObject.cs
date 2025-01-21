namespace FinanceProject.Server.Helpers
{
    public class QueryObject
    {
        public string? symbol { get; set; } = null;
        public string? companyName { get; set; } = null;

        public string? sortBy { get; set; } =null;
        public bool isDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;

    }
}
