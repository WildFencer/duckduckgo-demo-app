using System.Collections.Generic;
using System.Threading.Tasks;
using DuckDuck.Dto;

namespace DuckDuck.Services.Abstracts
{
    public interface IDuckDuckGoService
    {
        /// <summary>
        /// Returns DuckDuckGo simplified objects list by specified query parameter
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<DuckDuckGoSimplifiedListItem>> GetSimplifiedListAsync(string query);

        /// <summary>
        /// Returns DuckDuckGo simplified objects list by specified query parameter and history of past requested queries
        /// </summary>
        /// <returns></returns>
        Task<DuckDuckGoListAndHistory> GetSimplifiedListAndHistoryAsync(string query, IEnumerable<string> historyQueries);

        /// <summary>
        /// Returns flag for storing queries history
        /// </summary>
        /// <returns></returns>
        Task<bool> GetIsArchivedAsync();

        /// <summary>
        /// Set or update flag for storing queries history
        /// </summary>
        /// <returns></returns>
        Task UpsertIsArchivedAsync(bool isArchived);
    }
}