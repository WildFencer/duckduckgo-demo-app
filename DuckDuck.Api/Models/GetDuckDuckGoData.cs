using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace duckduckgo.Models
{
    public class GetDuckDuckGoData
    {
        public string Query { get; set; }
        public IEnumerable<string> HistoryQueries { get; set; }
    }
}