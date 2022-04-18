using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using AutoMapper;
using DuckDuck.Dal.Abstracts;
using DuckDuck.Dto;
using DuckDuck.Services.Abstracts;
using DuckDuck.Services.Models;

namespace DuckDuck.Services
{
    public class DuckDuckGoService : IDuckDuckGoService
    {
        private readonly IMapper mapper;
        private readonly IFileService files;

        private const string _baseUrl = "http://api.duckduckgo.com";
        private const string folder = @"c:\DuckDuckGoHistory";
        private const string filename = @"hist1.txt";

        public DuckDuckGoService(IMapper mapper, IFileService files)
        {
            this.mapper = mapper;
            this.files = files;
        }

        /// <inheritdoc />
        public async Task<IEnumerable<DuckDuckGoSimplifiedListItem>> GetSimplifiedListAsync(string query)
        {
            return await GetDuckDuckGoSimplifiedListAsync(query);
        }

        /// <inheritdoc />
        public async Task<DuckDuckGoListAndHistory> GetSimplifiedListAndHistoryAsync(string query, IEnumerable<string> historyQueries)
        {
            var res = new DuckDuckGoListAndHistory();

            if (query is not null && query.Length > 0)
                res.Links = await GetDuckDuckGoSimplifiedListAsync(query);

            res.Queries = files.GetFileDataLines($"{folder}\\{filename}");
            
            var currentHistory = res.Queries.ToList<string>();
            var updatedHistory = historyQueries.ToList<string>();
            if (query is not null && query.Length > 0)
                updatedHistory.Add(query);
            updatedHistory = updatedHistory.Union(currentHistory).ToList();
            res.Queries = updatedHistory;

            await files.SaveDataLinesToFile(folder, filename, updatedHistory);

            return res;
        }

        /// <inheritdoc />
        public async Task<bool> GetIsArchivedAsync()
        {
            var data = files.GetFileDataLines($"{folder}\\mode.txt");
            if (data is null || data.Count() == 0) return false;

            bool.TryParse(data[0], out var res);
            return res;
        }

        /// <inheritdoc />
        public async Task UpsertIsArchivedAsync(bool isArchived)
        {
           await files.SaveSingleLineToFile(folder, "mode.txt", isArchived.ToString());
        }

        private async Task<IEnumerable<DuckDuckGoSimplifiedListItem>> GetDuckDuckGoSimplifiedListAsync(string query)
        {
            var res = new List<DuckDuckGoSimplifiedListItem>();

            using (var client = new HttpClient())
            {
                var results = await client.GetFromJsonAsync<DuckDuckGo>($"{_baseUrl}/?q={query}&format=json");

                foreach (var item in results.RelatedTopics)
                {
                    if (item.Topics is null)
                    {
                        res.Add(mapper.Map<DuckDuckGoSimplifiedListItem>(item));
                    }
                    else
                    {
                        foreach (var tItem in item.Topics)
                        {
                            res.Add(mapper.Map<DuckDuckGoSimplifiedListItem>(tItem));
                        }
                    }
                }
            }

            return res;
        }
    }
}
