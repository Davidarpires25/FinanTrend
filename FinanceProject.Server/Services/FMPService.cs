using FinanceProject.Server.Dtos.Stock;
using FinanceProject.Server.Interfaces;
using FinanceProject.Server.Mappers;
using FinanceProject.Server.Models;
using Newtonsoft.Json;

namespace FinanceProject.Server.Services
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var xd = $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}";
                Console.WriteLine(xd);

                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];
                    if (stock != null)
                    {
                        Console.WriteLine($"Stock found: {stock.ToStockFromFMP().Symbol}");

                        return stock.ToStockFromFMP();
                    }
                    Console.WriteLine("Stock not found in FMP");

                    return null;
                }
                Console.WriteLine("Failed to fetch stock from FMP");

                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception: {e.Message}");
                return null;
            }
        }
    }
}
