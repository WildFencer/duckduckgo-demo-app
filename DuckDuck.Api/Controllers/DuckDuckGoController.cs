using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using DuckDuck.Api.Attributes;
using DuckDuck.Dto;
using DuckDuck.Services.Abstracts;
using duckduckgo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DuckDuck.Api.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DuckDuckGoController : ControllerBase
    {
        private readonly IDuckDuckGoService duckDuckGoes;

        public DuckDuckGoController(IDuckDuckGoService duckDuckGoes)
        {
            this.duckDuckGoes = duckDuckGoes;
        }

        /// <summary>
        /// Get DuckDuckGo simplified list
        /// </summary>
        /// <remarks>
        /// Returns DuckDuckGo simplified objects list by specified query parameter
        /// </remarks>
        /// <param name="q"></param>
        /// <returns></returns>
        [HttpGet]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IEnumerable<DuckDuckGoSimplifiedListItem>> GetSimplifiedList([FromQuery][Required] string q)
        {
            return await duckDuckGoes.GetSimplifiedListAsync(q);
        }

        /// <summary>
        /// Get DuckDuckGo simplified list and queries history
        /// </summary>
        /// <remarks>
        /// Returns DuckDuckGo simplified objects list by specified query parameter and history of past requested queries
        /// </remarks>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<DuckDuckGoListAndHistory> GetSimplifiedListAndHistory([FromBody] GetDuckDuckGoData data)
        {
            return await duckDuckGoes.GetSimplifiedListAndHistoryAsync(data.Query, data.HistoryQueries);
        }

        /// <summary>
        /// Get IsArchived flag
        /// </summary>
        /// <remarks>
        /// Returns flag for storing queries history
        /// </remarks>
        /// <param name="q"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("mode")]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<bool> GetIsArchived()
        {
            return await duckDuckGoes.GetIsArchivedAsync();
        }

        /// <summary>
        /// Set IsArchived flag
        /// </summary>
        /// <remarks>
        /// Set or update flag for storing queries history
        /// </remarks>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("mode")]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task SetIsArchived([FromBody] SetIsArchivedData data)
        {
            await duckDuckGoes.UpsertIsArchivedAsync(data.IsArchived);
        }
    }
}